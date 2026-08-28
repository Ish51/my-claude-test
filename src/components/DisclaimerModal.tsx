interface DisclaimerModalProps {
  onDismiss: () => void;
}

export default function DisclaimerModal({ onDismiss }: DisclaimerModalProps) {
  return (
    <div className="modal-overlay" role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-heading"
      >
        <p className="modal-eyebrow">Before you start</p>
        <h2 id="disclaimer-heading">Not financial advice</h2>
        <p className="modal-body">
          Trade Mirror is an educational tool for reflecting on trading habits. It is not
          financial advice and does not recommend buying or selling any stock. It&rsquo;s
          designed for use with stock-simulator trades. Nothing you enter is saved or stored.
        </p>
        <button type="button" className="btn btn-primary" onClick={onDismiss}>
          Got it — let&rsquo;s go
        </button>
      </div>
    </div>
  );
}
