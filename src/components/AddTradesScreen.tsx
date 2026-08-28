import type { Trade } from '../types';
import TradeForm from './TradeForm';
import TradeTable from './TradeTable';
import { createExampleTrades } from '../lib/exampleTrades';

interface AddTradesScreenProps {
  trades: Trade[];
  onAdd: (trade: Trade) => void;
  onRemove: (id: string) => void;
  onLoadExample: (trades: Trade[]) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const MIN_TRADES = 3;

export default function AddTradesScreen({
  trades,
  onAdd,
  onRemove,
  onLoadExample,
  onAnalyze,
  isAnalyzing,
}: AddTradesScreenProps) {
  return (
    <section>
      <header className="screen-header">
        <h1>See the patterns in how you trade.</h1>
        <p className="subtext">Add your trades and meet the habits you&rsquo;re up against.</p>
      </header>

      <hr className="rule" />

      <TradeForm onAdd={onAdd} />

      <button
        type="button"
        className="link-btn"
        onClick={() => onLoadExample(createExampleTrades())}
      >
        Load example trades
      </button>

      <hr className="rule" />

      <TradeTable trades={trades} onRemove={onRemove} />

      <div className="analyze-row">
        <button
          type="button"
          className="btn btn-primary btn-large"
          disabled={trades.length < MIN_TRADES || isAnalyzing}
          onClick={onAnalyze}
        >
          {isAnalyzing ? 'Reading your trades…' : 'Analyze my trades'}
        </button>
        {trades.length < MIN_TRADES && (
          <p className="hint-text">Add at least {MIN_TRADES} trades to unlock analysis.</p>
        )}
      </div>
    </section>
  );
}
