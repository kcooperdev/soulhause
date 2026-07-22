type PageHeroProps = {
  title: React.ReactNode;
  lede: React.ReactNode;
  eyebrow?: string;
  children?: React.ReactNode;
};

export function PageHero({ title, lede, eyebrow, children }: PageHeroProps) {
  return (
    <header className="page-hero">
      <div className="page-hero-wash" aria-hidden="true" />
      <p className="page-hero-watermark" aria-hidden="true">
        <span className="brand-soul">Soul</span>
        <span className="brand-hause">Hause</span>
      </p>
      <div className="wrap page-hero-inner">
        {eyebrow ? <p className="page-hero-eyebrow mono">{eyebrow}</p> : null}
        <h1 className="page-hero-title">{title}</h1>
        <p className="lede">{lede}</p>
        {children}
      </div>
    </header>
  );
}
