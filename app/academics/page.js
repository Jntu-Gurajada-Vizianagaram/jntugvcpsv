import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import styles from "./academics.module.css";

export const dynamic = "force-dynamic";

export default async function AcademicsPage() {
  noStore();
  const content = await getSiteContent();
  const { academicPrograms, admissionKeyData, scholarlyDownloads } = content;
  const highlights = admissionKeyData || [];
  const downloads = scholarlyDownloads || [];

  return (
    <SiteShell content={content}>
      <PageHero
        title="Academic Excellence"
        description="Explore our pharmaceutical programmes, academic framework, and specialized course structures designed for global healthcare impact."
        breadcrumbs={["Academics"]}
      />

      <main className="section">
        <div className="shell">
          <div className={styles.layoutGrid}>
            <aside>
              <div className={styles.sidebarCard}>
                <span className={styles.sectionTag}>Quick Metrics</span>
                <ul className={styles.metricsList}>
                  {highlights.map((item) => (
                    <li key={item.title} className={styles.metricItem}>
                      <strong>{item.title}</strong>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.sidebarCard}>
                <span className={styles.sectionTag}>Regulations</span>
                <p className={styles.mutedText}>
                  Standard PCI Regulations is Followed by JNTU-GV CPSV
                </p>
                <ul className={styles.linkList}>
                  {downloads.slice(0, 2).map((item) => (
                    <li key={item.title}>
                      <a href={item.file} target="_blank" rel="noreferrer" className={styles.linkItem}>
                        {item.title} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <section className={styles.boardSection}>
                <div className={styles.boardHead}>
                  <h2 className={styles.boardTitle}>Programmes Offered</h2>
                  <span className={styles.statusPill}>PCI Syllabi</span>
                </div>

                <div className={styles.tableResponsive}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Programme Name</th>
                        <th>Duration</th>
                        <th>Affiliation</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academicPrograms.map((program, index) => (
                        <tr key={`${program.name}-${index}`}>
                          <td><strong className={styles.progName}>{program.name}</strong></td>
                          <td>{program.duration}</td>
                          <td><span className={styles.statusPill}>{program.status}</span></td>
                          <td>{program.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <article className={styles.boardSection}>
                <span className={styles.sectionTag}>Resources</span>
                <h2 className={styles.boardTitle} style={{ marginBottom: '1rem' }}>Syllabus & Course Downloads</h2>
                <p className={styles.mutedText}>Access the official semester-wise syllabus and academic calendars for various programmes.</p>

                <div className={styles.resourceGrid}>
                  {downloads.map((item) => (
                    <article className={styles.resourceCard} key={item.title}>
                      <h3 className={styles.resourceTitle}>{item.title}</h3>
                      <p className={styles.resourceDesc}>{item.description}</p>
                      <a className={styles.downloadBtn} href={item.file} target="_blank" rel="noreferrer">
                        Download PDF
                      </a>
                    </article>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
