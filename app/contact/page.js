import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
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
      <ContentLayout
        sidebar={
          <div className="sidebar-card card-institutional" style={{ padding: '1.5rem' }}>
            <h3 className="section-tag">Administrative Headquarters</h3>
            <p style={{ fontWeight: 600, marginTop: '1rem' }}>{institutionalProfile.location}</p>
            <div style={{ marginTop: '1.5rem', display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
              <p><strong>Primary Desk:</strong> {institutionalProfile.phone}</p>
              <p><strong>Email:</strong> {institutionalProfile.email}</p>
            </div>
          </div>
        }
      >
        <div className="feature-grid three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {contactInventory.map((item, index) => (
            <article className="card card-institutional" key={`${item.label}-${index}`} style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{item.label}</h3>
              <p style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.value}</p>
            </article>
          ))}
        </div>

        <article className="content-card-block card-institutional" style={{ padding: '3rem', marginTop: '3rem', textAlign: 'center' }}>
          <span className="section-tag">Institutional Accessibility</span>
          <h2>Campus Visitation & Inquiry</h2>
          <p style={{ maxWidth: '700px', margin: '1rem auto' }} className="muted">
            The administrative offices are operational from Monday to Saturday, 09:30 AM to 05:00 PM. Prospective students and stakeholders are encouraged to coordinate prior appointments via the administrative desk for campus visitations.
          </p>
        </article>
      </ContentLayout>
    </SiteShell>
  );
}
