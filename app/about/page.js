import { unstable_noStore as noStore } from "next/cache";
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
      
      <main className="section">
        <div className="shell">
          <div className="portal-layout-grid">
            <aside className="sidebar-box">
              <div className="sidebar-card card-institutional">
                <span className="section-tag">Academic Navigation</span>
                <ul className="footer-link-list">
                  {academicLinks.map((item) => (
                    <li key={item.label} className="text-link" style={{ fontSize: '0.9rem' }}>• {item.label}</li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="portal-main">
              <div className="stacked-sections">
                <article className="content-card-block card-institutional">
                  <h2>Institutional Narrative</h2>
                  <p className="principal-lead">{institutionalProfile.about}</p>
                  <p className="muted">{institutionalProfile.websiteNorms}</p>
                </article>

                <div className="grid-res-2 margin-top">
                  <article className="card card-institutional" style={{ borderLeft: '4px solid var(--accent)' }}>
                    <h3 style={{ color: 'var(--primary)' }}>Institutional Vision</h3>
                    <p style={{ fontStyle: 'italic' }}>"{institutionalProfile.vision}"</p>
                  </article>
                  <article className="card card-institutional" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <h3 style={{ color: 'var(--primary)' }}>Institutional Mission</h3>
                    <p>{institutionalProfile.mission}</p>
                  </article>
                  <article className="card card-institutional" style={{ gridColumn: '1 / -1' }}>
                    <h3 style={{ color: 'var(--primary)' }}>Statutory Identity & Accreditation</h3>
                    <p style={{ fontWeight: 600 }}>
                      {institutionalProfile.status} | {institutionalProfile.approvals}
                    </p>
                    <p className="muted" style={{ marginTop: '0.5rem' }}>
                      Operational Campus: {institutionalProfile.location}
                    </p>
                  </article>
                </div>

                <article className="content-card-block card-institutional margin-top-xl">
                  <h2>Governance & Academic Divisions</h2>
                  <div className="grid-res-2 margin-top">
                    {institutionalDirectory.map((item) => (
                      <article className="card-minimal" key={item.title}>
                        <h3 className="faculty-name" style={{ margin: 0 }}>{item.title}</h3>
                        <p className="muted" style={{ fontSize: '0.85rem' }}>{item.description}</p>
                      </article>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
