# Trade Mirror

A behavioral coach for first-time teen investors. Add some trades and Trade
Mirror reflects back the patterns in *how* you trade — timing, sizing, hype
chasing, quick reversals — in plain, friendly language.

**Trade Mirror is an educational reflection tool. It is not financial advice
and never recommends buying or selling any stock.** It's meant for practicing
with stock-simulator trades. Nothing you enter is saved or stored anywhere —
everything lives in memory for the session and is gone on refresh.

## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Setting up the AI analysis (optional)

Trade Mirror uses Google's free-tier Gemini API to analyze trades. It works
fine without a key — you'll just see a realistic sample result instead of a
live one.

To turn on live analysis:

1. Get a free API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. Copy `.env.local.example` to `.env.local` (already gitignored — your key
   is never committed).
3. Set `VITE_GEMINI_API_KEY=your-key-here` in `.env.local`.
4. Restart `npm run dev`.

If the API key is missing or the API call fails for any reason, the app
automatically falls back to a realistic sample result so it still works for
a demo.

## Project structure

- `src/lib/analysisPrompt.ts` — the analysis prompt's instructions/persona.
  This is the one file to edit to change how the coach reads trades; nothing
  else needs to change.
- `src/lib/gemini.ts` — builds the full prompt (persona + trade data + output
  format), calls the Gemini API, and validates/parses the response.
- `src/lib/sampleResult.ts` — the fallback sample result shown when there's
  no API key or the live call fails.
- `src/components/` — UI: the disclaimer modal, the add-trades screen, the
  results screen, and the pattern cards.

## Tech

React + Vite + TypeScript, plain CSS (no UI framework), no backend, no
accounts, no database.
