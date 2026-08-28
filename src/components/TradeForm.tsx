import { useState, type FormEvent } from 'react';
import type { Trade, TradeAction } from '../types';
import { makeId } from '../lib/id';

interface TradeFormProps {
  onAdd: (trade: Trade) => void;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function TradeForm({ onAdd }: TradeFormProps) {
  const [date, setDate] = useState(todayIso());
  const [ticker, setTicker] = useState('');
  const [action, setAction] = useState<TradeAction>('Buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const canSubmit =
    date.trim() !== '' && ticker.trim() !== '' && Number(quantity) > 0 && Number(price) > 0;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onAdd({
      id: makeId(),
      date,
      ticker: ticker.trim().toUpperCase(),
      action,
      quantity: Number(quantity),
      price: Number(price),
    });
    setTicker('');
    setQuantity('');
    setPrice('');
  }

  return (
    <form className="trade-form" onSubmit={handleSubmit}>
      <div className="trade-form-grid">
        <label className="field field-date">
          <span className="field-label">Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>

        <label className="field field-ticker">
          <span className="field-label">Ticker</span>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="AAPL"
            maxLength={10}
            required
          />
        </label>

        <label className="field field-action">
          <span className="field-label">Buy or sell</span>
          <select value={action} onChange={(e) => setAction(e.target.value as TradeAction)}>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </label>

        <label className="field field-qty">
          <span className="field-label">Quantity</span>
          <input
            type="number"
            min="0"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
            required
          />
        </label>

        <label className="field field-price">
          <span className="field-label">Price per share</span>
          <div className="price-input">
            <span className="price-prefix">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
        </label>
      </div>

      <button type="submit" className="btn btn-secondary" disabled={!canSubmit}>
        Add trade
      </button>
    </form>
  );
}
