export type TradeAction = 'Buy' | 'Sell';

export interface Trade {
  id: string;
  date: string; // YYYY-MM-DD
  ticker: string;
  action: TradeAction;
  quantity: number;
  price: number;
}

export interface PatternCard {
  title: string;
  evidence: string;
  whyItMatters: string;
  beatThisBy: string;
}

export interface AnalysisResult {
  cards: PatternCard[];
  isFallback: boolean;
  fallbackReason?: string;
}
