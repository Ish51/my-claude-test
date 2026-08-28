import type { AnalysisResult } from '../types';
import PatternCardView from './PatternCard';

interface ResultsScreenProps {
  result: AnalysisResult;
  onStartOver: () => void;
}

export default function ResultsScreen({ result, onStartOver }: ResultsScreenProps) {
  return (
    <section>
      <header className="screen-header">
        <h1>Here&rsquo;s what your trades are telling you.</h1>
      </header>

      {result.isFallback && result.fallbackReason && (
        <p className="fallback-note">{result.fallbackReason}</p>
      )}

      <hr className="rule" />

      <div className="pattern-grid">
        {result.cards.map((card, i) => (
          <PatternCardView key={i} card={card} />
        ))}
      </div>

      <hr className="rule" />

      <button type="button" className="btn btn-primary" onClick={onStartOver}>
        Start over
      </button>
    </section>
  );
}
