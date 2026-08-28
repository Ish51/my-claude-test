import type { Trade } from '../types';
import { makeId } from './id';

const EXAMPLE_ROWS: Omit<Trade, 'id'>[] = [
  { date: '2026-08-24', ticker: 'DJT', action: 'Buy', quantity: 1082, price: 9.25 },
  { date: '2026-08-24', ticker: 'TSLA', action: 'Buy', quantity: 43, price: 351.59 },
  { date: '2026-08-24', ticker: 'VOO', action: 'Buy', quantity: 36, price: 702.27 },
  { date: '2026-08-26', ticker: 'DJT', action: 'Sell', quantity: 1082, price: 9.42 },
  { date: '2026-08-26', ticker: 'NVDA', action: 'Buy', quantity: 48, price: 210.88 },
];

export function createExampleTrades(): Trade[] {
  return EXAMPLE_ROWS.map((row) => ({ ...row, id: makeId() }));
}
