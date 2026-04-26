import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function MandatoryDisclosurePage() {
  noStore();
  const content = await getSiteContent();

  const { mandatoryDisclosures, complianceAudit } = content;

  return (
    <SiteShell content={content}>
      <main className="viewport-portal-main">
        <PageHero
          title="Statutory Mandatory Disclosures"
          description="Official institutional disclosures and statutory compliance metrics as per UGC and Pharmacy Council of India (PCI) regulations."
          breadcrumbs={["Regulatory Disclosures"]}
        />

        <div className="portal-scroll-layout" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', padding: '2rem 0' }}>
          <aside className="portal-scroll-side">
            <div className="sidebar-card card-institutional" style={{ padding: '1.5rem' }}>
              <h3 className="section-tag" style={{ width: '100%' }}>Audit Status</h3>
              <div className="compliance-mini-board" style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                {complianceAudit.map((item, index) => (
                  <div key={index} className="compliance-row" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span className={`status-dot ${item.status.toLowerCase().includes('verified') ? 'green' : 'gold'}`} style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.status.toLowerCase().includes('verified') ? '#10b981' : '#f59e0b', marginTop: '6px', flexShrink: 0 }}></span>
                    <div>
                      <strong style={{ fontSize: '0.85rem', display: 'block' }}>{item.item}</strong>
                      <span className="muted" style={{ fontSize: '0.75rem' }}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="margin-top" style={{ marginTop: '2rem' }}>
              <div className="sidebar-card card-institutional" style={{ padding: '1.5rem' }}>
                <h3 className="section-tag" style={{ width: '100%' }}>Disclosure Index</h3>
                <ul className="bullet-list-minimal" style={{ listStyle: 'none', padding: 0, margin: '1rem 0', display: 'grid', gap: '0.5rem' }}>
                  {mandatoryDisclosures.map(s => (
                    <li key={s.title} style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--primary)' }}>• {s.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <section className="portal-scroll-main">
            <div className="dashboard-grid">
              {mandatoryDisclosures.map((section) => (
                <article className="content-card-block card-institutional" key={section.title} style={{ marginBottom: "2rem", padding: '2rem' }}>
                  <span className="notice-pill" style={{ background: 'var(--bg-soft)', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Statutory Section</span>
                  <h2 style={{ fontSize: "1.8rem", margin: "0.5rem 0" }}>{section.title}</h2>
                  <div className="disclosure-items-list" style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
                    {section.items.map((item, index) => (
                      <div key={index} className="disclosure-item-line" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.5rem', background: 'var(--bg-soft)', borderRadius: '8px' }}>
                        <span className="bullet-dot" style={{ fontSize: '0.8rem' }}>📘</span>
                        <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* Detailed Table Section */}
            <div className="content-card-block card-institutional" style={{ padding: '2rem' }}>
              <h2>Institutional Compliance Matrix</h2>
              <p className="muted" style={{ marginBottom: '1.5rem' }}>A comprehensive overview of institutional adherence to regulatory norms and their digital availability.</p>
              <div className="table-wrapper" style={{ overflowX: 'auto' }}>
                <table className="institutional-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-soft)', textAlign: 'left' }}>
                      <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Statutory Requirement</th>
                      <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Audit Status</th>
                      <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Electronic Placement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceAudit.map((item, index) => (
                      <tr key={index}>
                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}><strong>{item.item}</strong></td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}><span className="notice-pill" style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0369a1' }}>{item.status}</span></td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}><code style={{ background: '#f1f5f9', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>{item.placement}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}

