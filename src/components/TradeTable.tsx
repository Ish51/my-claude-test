import type { Trade } from '../types';

interface TradeTableProps {
  trades: Trade[];
  onRemove: (id: string) => void;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatMoney(n: number): string {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function TradeTable({ trades, onRemove }: TradeTableProps) {
  if (trades.length === 0) {
    return (
      <p className="empty-state">
        No trades yet. Add one above, or load the example trades to see how it works.
      </p>
    );
  }

  return (
    <div className="trade-table-wrap">
      <p className="trade-count">
        {trades.length} {trades.length === 1 ? 'trade' : 'trades'} added
      </p>
      <div className="table-scroll">
        <table className="trade-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Ticker</th>
              <th>Action</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th aria-label="Remove"></th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr key={t.id}>
                <td>{formatDate(t.date)}</td>
                <td className="ticker-cell">{t.ticker}</td>
                <td>
                  <span className={`action-tag action-${t.action.toLowerCase()}`}>
                    {t.action}
                  </span>
                </td>
                <td>{t.quantity.toLocaleString()}</td>
                <td>${t.price.toFixed(2)}</td>
                <td>${formatMoney(t.quantity * t.price)}</td>
                <td>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => onRemove(t.id)}
                    aria-label={`Remove ${t.ticker} trade`}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
