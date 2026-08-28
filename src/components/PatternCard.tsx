import type { PatternCard as PatternCardType } from '../types';

interface PatternCardProps {
  card: PatternCardType;
}

export default function PatternCard({ card }: PatternCardProps) {
  return (
    <article className="pattern-card">
      <h3 className="pattern-title">{card.title}</h3>
      <p className="pattern-evidence">{card.evidence}</p>
      <p className="pattern-why">{card.whyItMatters}</p>
      <div className="beat-this-by">
        <p>{card.beatThisBy}</p>
      </div>
    </article>
  );
}
