import { useState } from 'react';
import type { Trade, AnalysisResult } from './types';
import DisclaimerModal from './components/DisclaimerModal';
import AddTradesScreen from './components/AddTradesScreen';
import ResultsScreen from './components/ResultsScreen';
import { analyzeTrades } from './lib/gemini';

type Screen = 'form' | 'results';

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [screen, setScreen] = useState<Screen>('form');
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  function handleAdd(trade: Trade) {
    setTrades((prev) => [...prev, trade]);
  }

  function handleRemove(id: string) {
    setTrades((prev) => prev.filter((t) => t.id !== id));
  }

  function handleLoadExample(exampleTrades: Trade[]) {
    setTrades(exampleTrades);
  }

  async function handleAnalyze() {
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeTrades(trades);
      setResult(analysis);
      setScreen('results');
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleStartOver() {
    setTrades([]);
    setResult(null);
    setScreen('form');
  }

  return (
    <div className="app-shell">
      {showDisclaimer && <DisclaimerModal onDismiss={() => setShowDisclaimer(false)} />}

      <header className="masthead">
        <div className="masthead-inner">
          <span className="masthead-mark">Trade Mirror</span>
          <span className="masthead-tag">a behavioral coach for new investors</span>
        </div>
      </header>

      <main className="app-main">
        {screen === 'form' && (
          <AddTradesScreen
            trades={trades}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onLoadExample={handleLoadExample}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
        )}
        {screen === 'results' && result && (
          <ResultsScreen result={result} onStartOver={handleStartOver} />
        )}
      </main>

      <footer className="app-footer">
        <button type="button" className="footer-link" onClick={() => setShowDisclaimer(true)}>
          Not financial advice
        </button>
      </footer>
    </div>
  );
}

export default App;
