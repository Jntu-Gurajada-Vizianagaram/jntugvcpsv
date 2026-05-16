import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import styles from "./mandatory-disclosure.module.css";

export const dynamic = "force-dynamic";

export default async function MandatoryDisclosurePage() {
  noStore();
  const content = await getSiteContent();
  const { mandatoryDisclosures, complianceAudit } = content;

  return (
    <SiteShell content={content}>
      <main className="section">
        <PageHero
          title="Statutory Mandatory Disclosures"
          description="Official institutional disclosures and statutory compliance metrics as per UGC and Pharmacy Council of India (PCI) regulations."
          breadcrumbs={["Regulatory Disclosures"]}
        />

        <section className="section">
          <div className="shell">
            <div className={styles.layoutGrid}>
              <aside>
                <div className={styles.sidebarCard}>
                  <span className={styles.sectionTag}>Audit Status</span>
                  <div className={styles.complianceBoard}>
                    {complianceAudit.map((item, index) => (
                      <div key={index} className={styles.complianceItem}>
                        <span className={`${styles.statusDot} ${item.status.toLowerCase().includes('verified') ? styles.green : styles.gold}`}></span>
                        <div>
                          <strong className={styles.complianceTitle}>{item.item}</strong>
                          <span className={styles.complianceStatus}>{item.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.sidebarCard}>
                  <span className={styles.sectionTag}>Disclosure Index</span>
                  <ul className={styles.bulletList}>
                    {mandatoryDisclosures.map(s => (
                      <li key={s.title}>{s.title}</li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className={styles.mainContent}>
                <div className={styles.disclosureGrid}>
                  {mandatoryDisclosures.map((section) => (
                    <article className={styles.contentCard} key={section.title}>
                      <span className={styles.noticePill}>Statutory Section</span>
                      <h2 className={styles.cardTitle}>{section.title}</h2>
                      <div className={styles.compactList}>
                        {section.items.map((item, index) => (
                          <div key={index} className={styles.disclosureLine}>
                            <span className={styles.bulletIcon}>📘</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>

                <div className={styles.contentCard}>
                  <h2 className={styles.cardTitle}>Institutional Compliance Matrix</h2>
                  <p className={styles.mutedText}>A comprehensive overview of institutional adherence to regulatory norms and their digital availability.</p>
                  
                  <div className={styles.tableResponsive}>
                    <table className={styles.dataTable}>
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
                            <td><strong className={styles.reqItem}>{item.item}</strong></td>
                            <td><span className={styles.noticePill} style={{ marginBottom: 0 }}>{item.status}</span></td>
                            <td><code className={styles.codePlacement}>{item.placement}</code></td>
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
