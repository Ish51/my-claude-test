import type { PatternCard } from '../types';

// A realistic, hand-written sample result. Shown when there's no Gemini API
// key configured, or when the live API call fails, so the app still demos
// well end to end.
export const SAMPLE_PATTERN_CARDS: PatternCard[] = [
  {
    title: '"The Two-Day Flip"',
    evidence:
      'You bought 1,082 shares of DJT at $9.25 on 8/24 and sold all 1,082 two days later at $9.42 — a $184 move on a position worth roughly $10,000, in and out inside 48 hours.',
    whyItMatters:
      "Exiting a large position almost as fast as you entered it is a sign you're trading the next few hours of price movement, not the company. That's fine to notice about yourself early — it's a very different game from investing, with very different odds.",
    beatThisBy:
      'Beat this by writing down your reason for a trade before you make it. If the honest reason is "it\'s moving," treat it as a short-term bet and size it small on purpose.',
  },
  {
    title: '"The Hype Chaser"',
    evidence:
      'Alongside DJT, the same session included TSLA (43 shares at $351.59) and NVDA (48 shares at $210.88) — three of the most talked-about, high-momentum tickers on the market, all bought within a two-day window.',
    whyItMatters:
      "There's nothing wrong with any one of these companies — but buying a cluster of the most-hyped names at the same time often means the news feed is picking your trades, not the other way around.",
    beatThisBy:
      "Beat this by pausing before you buy anything you saw trending today. Ask: would I still want this if nobody was talking about it?",
  },
  {
    title: '"The Afterthought Diversifier"',
    evidence:
      'Your one broad-market position, 36 shares of VOO at $702.27 (~$25,300), was placed the same day as three single-stock bets — but it was the only trade that wasn\'t a name in the headlines.',
    whyItMatters:
      "Index funds like VOO are often the steadiest part of a portfolio, but when they're squeezed in alongside a run of speculative single-stock trades, diversification can end up as an afterthought rather than the foundation.",
    beatThisBy:
      'Beat this by deciding your index vs. single-stock split before you open the app each week, not while you\'re already mid-trade.',
  },
  {
    title: '"The Round-Tripper"',
    evidence:
      "DJT is the only ticker you both bought and sold in this set — bought at $9.25, sold at $9.42, a single round trip with no other position closed out.",
    whyItMatters:
      "Closing the one trade that had barely moved, while leaving TSLA, VOO, and NVDA untouched, suggests the DJT exit may have been about relief or restlessness rather than a plan.",
    beatThisBy:
      'Beat this by setting a target and a "why I\'d sell early" reason at the same time you buy — so an exit is a decision, not a reflex.',
  },
];

export const SAMPLE_FALLBACK_MESSAGE =
  "We couldn't reach the live analysis right now, so here's a realistic sample reflection instead — your actual trades weren't sent anywhere.";
