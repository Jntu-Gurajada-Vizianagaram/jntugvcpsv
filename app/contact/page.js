import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  noStore();
  const content = await getSiteContent();
  const { contactInventory, institutionalProfile } = content;

  return (
    <SiteShell content={content}>
      <PageHero
        title="Connect With Us"
        description="Official administrative coordinates, communication channels, and institutional access information for stakeholders."
        breadcrumbs={["Administrative Office"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className="portal-layout-grid">
            <aside className="sidebar-box">
              <div className="sidebar-card card-institutional">
                <span className="section-tag">Administrative HQ</span>
                <p style={{ fontWeight: 600, marginTop: '1rem' }}>{institutionalProfile.location}</p>
                <div className="margin-top" style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <p><strong>Primary Desk:</strong> {institutionalProfile.phone}</p>
                  <p><strong>Email:</strong> {institutionalProfile.email}</p>
                </div>
              </div>
            </aside>

            <div className="portal-main">
              <div className="grid-res-3">
                {contactInventory.map((item, index) => (
                  <article className="card card-institutional" key={`${item.label}-${index}`}>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{item.label}</h3>
                    <p style={{ fontWeight: 700, color: 'var(--primary)' }}>{item.value}</p>
                  </article>
                ))}
              </div>

              <article className="content-card-block card-institutional text-center margin-top-xl">
                <span className="section-tag">Institutional Accessibility</span>
                <h2>Campus Visitation & Inquiry</h2>
                <p className="lead" style={{ margin: '1rem auto' }}>
                  The administrative offices are operational from Monday to Saturday, 09:30 AM to 05:00 PM. Prospective students and stakeholders are encouraged to coordinate prior appointments via the administrative desk for campus visitations.
                </p>
              </article>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
