import type { Trade, PatternCard, AnalysisResult } from '../types';
import { ANALYSIS_PROMPT } from './analysisPrompt';
import { SAMPLE_PATTERN_CARDS, SAMPLE_FALLBACK_MESSAGE } from './sampleResult';

// A current, free-tier Gemini model. Change here if Google renames/retires it.
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

class GeminiError extends Error {}

function formatTradesForPrompt(trades: Trade[]): string {
  return trades
    .map((t) => {
      const total = (t.quantity * t.price).toFixed(2);
      return `${t.date} — ${t.action.toUpperCase()} ${t.quantity} ${t.ticker} @ $${t.price.toFixed(2)} (total $${total})`;
    })
    .join('\n');
}

function buildFullPrompt(trades: Trade[]): string {
  return `${ANALYSIS_PROMPT}

Here are the trades, in the order they were entered:
${formatTradesForPrompt(trades)}

Respond with ONLY a JSON array (no markdown fences, no extra commentary) of 3 to 5 pattern
objects. Each object must have exactly these string fields:
- "title": a short, punchy named-opponent pattern title (do not include quote characters yourself)
- "evidence": one or two sentences citing the specific trades (real tickers, dates, quantities, prices) that reveal this pattern
- "whyItMatters": one short sentence on why this habit matters
- "beatThisBy": one short, encouraging, concrete sentence starting with "Beat this by" — never a buy/sell recommendation for any specific stock

Only return the JSON array, nothing else.`;
}

function isPatternCard(value: unknown): value is PatternCard {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.title === 'string' &&
    typeof v.evidence === 'string' &&
    typeof v.whyItMatters === 'string' &&
    typeof v.beatThisBy === 'string'
  );
}

async function callGemini(trades: Trade[], apiKey: string): Promise<PatternCard[]> {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildFullPrompt(trades) }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.9,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new GeminiError(`Gemini API responded with ${response.status}: ${body.slice(0, 300)}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== 'string') {
    throw new GeminiError('Gemini API returned an unexpected response shape.');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new GeminiError('Could not parse the Gemini API response as JSON.');
  }

  if (!Array.isArray(parsed) || parsed.length === 0 || !parsed.every(isPatternCard)) {
    throw new GeminiError('Gemini API response did not match the expected pattern-card shape.');
  }

  return parsed;
}

// Sends the trades to Gemini for analysis. Falls back to a realistic sample
// result — with a friendly explanation — if no API key is configured or the
// live call fails for any reason, so the app always demos cleanly.
export async function analyzeTrades(trades: Trade[]): Promise<AnalysisResult> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return {
      cards: SAMPLE_PATTERN_CARDS,
      isFallback: true,
      fallbackReason:
        "No Gemini API key is set up yet, so here's a sample reflection to show you what Trade Mirror does.",
    };
  }

  try {
    const cards = await callGemini(trades, apiKey);
    return { cards, isFallback: false };
  } catch (err) {
    console.error('Trade Mirror: Gemini analysis failed, using sample fallback.', err);
    return {
      cards: SAMPLE_PATTERN_CARDS,
      isFallback: true,
      fallbackReason: SAMPLE_FALLBACK_MESSAGE,
    };
  }
}
