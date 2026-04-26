import Link from "next/link";

export function PageHero({ title, description, breadcrumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
        <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.65)' }}>Home</Link>
          {breadcrumbs.map((item) => (
            <span key={item} style={{ color: 'rgba(255,255,255,0.9)' }}>{item}</span>
          ))}
        </nav>
        <div className="page-hero-card">
          <span className="section-tag" style={{ background: 'rgba(212,175,55,0.18)', color: 'var(--gold)', border: '1px solid rgba(212,175,55,0.3)' }}>JNTUGV CPSV</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
