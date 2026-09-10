"use client";

export function HouseGuide({
  index,
  total,
  title,
  body,
  nextLabel,
  onNext,
  onBack,
  onSkip,
}: {
  index: number;
  total: number;
  title: string;
  body: string;
  nextLabel: string;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}) {
  const last = index >= total - 1;

  return (
    <div className="house-guide" role="dialog" aria-labelledby="house-guide-title">
      <p className="house-guide-count">
        {index + 1} / {total}
      </p>
      <h2 id="house-guide-title" className="house-guide-title">
        {title}
      </h2>
      <p className="house-guide-body">{body}</p>
      <div className="house-guide-row">
        <button type="button" className="house-guide-next" onClick={onNext}>
          {nextLabel}
        </button>
        {index > 0 ? (
          <button type="button" className="house-guide-text" onClick={onBack}>
            Back
          </button>
        ) : null}
        {!last ? (
          <button type="button" className="house-guide-text" onClick={onSkip}>
            Skip
          </button>
        ) : null}
      </div>
    </div>
  );
}
