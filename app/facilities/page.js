import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function FacilitiesPage() {
  noStore();
  const content = await getSiteContent();
  const facilities = content.campusInfrastructure || content.facilities || [];

  return (
    <SiteShell content={content}>
      <PageHero
        title="Institutional Facilities"
        description="Explore our world-class infrastructure, specialized research laboratories, and student-centric support ecosystems."
        breadcrumbs={["Facilities"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className="portal-layout-grid">
            <aside className="sidebar-box">
              <div className="sidebar-card card-institutional">
                <span className="section-tag">Facility Quick-Link</span>
                <ul className="footer-link-list">
                  {facilities.map((item) => (
                    <li key={item.title} className="text-link" style={{ fontSize: '0.9rem' }}>• {item.title}</li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-card card-institutional">
                <span className="section-tag">Residential Status</span>
                <p className="muted" style={{ fontSize: '0.85rem' }}>
                  The institution provides secure, gender-segregated residential halls within the campus premises, compliant with university housing norms.
                </p>
              </div>
            </aside>

            <div className="portal-main">
              <div className="grid-res-2">
                {facilities.map((facility) => (
                  <article className="card card-institutional" key={facility.title}>
                    <span className="notice-pill">Infrastructure</span>
                    <h3 className="faculty-name" style={{ marginTop: '0.75rem' }}>{facility.title}</h3>
                    <p className="muted" style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>{facility.description}</p>
                  </article>
                ))}
              </div>

              <article className="content-card-block card-institutional text-center margin-top-xl">
                <span className="section-tag">Campus Life</span>
                <h2>Holistic Student Ecosystem</h2>
                <p className="lead" style={{ margin: '1.5rem auto' }}>
                  Beyond academic infrastructure, JNTU-GV CPSV offers a comprehensive ecosystem including diagnostic labs, digital libraries, and wellness centers to ensure the holistic development of pharmaceutical scholars.
                </p>
              </article>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
