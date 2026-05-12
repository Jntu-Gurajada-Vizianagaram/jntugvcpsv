import Link from "next/link";

export function PageHero({ title, description, breadcrumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {breadcrumbs.map((item) => (
            <span key={item}>{item}</span>
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
