type PageHeroProps = {
  title: React.ReactNode;
  lede: string;
};

export function PageHero({ title, lede }: PageHeroProps) {
  return (
    <header className="page-hero path-signature-block">
      <div className="page-hero-bg" aria-hidden="true">
        <div className="page-hero-grid" />
      </div>
      <div className="wrap page-hero-inner">
        <h1 className="page-hero-title path-signature-head">{title}</h1>
        <p className="lede">{lede}</p>
      </div>
    </header>
  );
}
