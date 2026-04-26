import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  noStore();
  const content = await getSiteContent();
  const { institutionalProfile, academicLinks, institutionalDirectory } = content;

  return (
    <SiteShell content={content}>
      <PageHero
        title="Institutional Portfolio"
        description="A comprehensive overview of our vision, mission, and the statutory identity of the JNTU-GV College of Pharmaceutical Sciences."
        breadcrumbs={["Institutional Profile"]}
      />
      <ContentLayout
        sidebar={
          <div className="sidebar-card card-institutional" style={{ padding: '1.5rem' }}>
            <h3 className="section-tag">Academic Navigation</h3>
            <ul className="link-list" style={{ listStyle: 'none', padding: 0, marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
              {academicLinks.map((item) => (
                <li key={item.label} style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>• {item.label}</li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="stacked-sections">
          <article className="content-card-block card-institutional" style={{ padding: '2rem' }}>
            <h2>Institutional Narrative</h2>
            <p className="lead" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{institutionalProfile.about}</p>
            <p className="muted">{institutionalProfile.websiteNorms}</p>
          </article>

          <div className="feature-grid two-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <article className="card card-institutional" style={{ padding: '2rem', borderLeft: '4px solid var(--accent)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)' }}>Institutional Vision</h3>
              <p style={{ fontStyle: 'italic' }}>"{institutionalProfile.vision}"</p>
            </article>
            <article className="card card-institutional" style={{ padding: '2rem', borderLeft: '4px solid var(--primary)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)' }}>Institutional Mission</h3>
              <p>{institutionalProfile.mission}</p>
            </article>
            <article className="card card-institutional" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)' }}>Statutory Identity & Accreditation</h3>
              <p style={{ fontWeight: 600 }}>
                {institutionalProfile.status} | {institutionalProfile.approvals}
              </p>
              <p className="muted" style={{ marginTop: '0.5rem' }}>
                Operational Campus: {institutionalProfile.location}
              </p>
            </article>
          </div>

          <article className="content-card-block card-institutional" style={{ padding: '2rem', marginTop: '3rem' }}>
            <h2>Governance & Academic Divisions</h2>
            <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              {institutionalDirectory.map((item) => (
                <article className="card-minimal" key={item.title} style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.85rem' }} className="muted">{item.description}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </ContentLayout>
    </SiteShell>
  );
}
