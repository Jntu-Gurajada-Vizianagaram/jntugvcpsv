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

        <section className="section">
          <div className="shell">
            <div className="portal-layout-grid">
              <aside className="sidebar-box">
                <div className="sidebar-card card-institutional">
                  <span className="section-tag">Audit Status</span>
                  <div className="compliance-board">
                    {complianceAudit.map((item, index) => (
                      <div key={index} className="compliance-item">
                        <span className={`status-dot ${item.status.toLowerCase().includes('verified') ? 'green' : 'gold'}`}></span>
                        <div>
                          <strong style={{ fontSize: '0.85rem', display: 'block' }}>{item.item}</strong>
                          <span className="muted" style={{ fontSize: '0.75rem' }}>{item.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sidebar-card card-institutional">
                  <span className="section-tag">Disclosure Index</span>
                  <ul className="bullet-list-minimal">
                    {mandatoryDisclosures.map(s => (
                      <li key={s.title}>{s.title}</li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className="portal-main">
                <div className="disclosure-grid">
                  {mandatoryDisclosures.map((section) => (
                    <article className="content-card-block card-institutional" key={section.title}>
                      <span className="notice-pill">Statutory Section</span>
                      <h2 className="margin-top-sm">{section.title}</h2>
                      <div className="compact-list margin-top">
                        {section.items.map((item, index) => (
                          <div key={index} className="disclosure-item-line">
                            <span className="bullet-dot">📘</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>

                <div className="content-card-block card-institutional margin-top-xl">
                  <h2>Institutional Compliance Matrix</h2>
                  <p className="muted margin-bottom">A comprehensive overview of institutional adherence to regulatory norms and their digital availability.</p>
                  
                  <div className="table-responsive">
                    <table className="institutional-table">
                      <thead>
                        <tr>
                          <th>Statutory Requirement</th>
                          <th>Audit Status</th>
                          <th>Electronic Placement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {complianceAudit.map((item, index) => (
                          <tr key={index}>
                            <td><strong>{item.item}</strong></td>
                            <td><span className="notice-pill">{item.status}</span></td>
                            <td><code>{item.placement}</code></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
