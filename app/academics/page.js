import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AcademicsPage() {
  noStore();
  const content = await getSiteContent();
  const { academicPrograms, admissionsHighlights, downloads } = content;

  return (
    <SiteShell content={content}>
      <PageHero
        title="Academic Excellence"
        description="Explore our pharmaceutical programmes, academic framework, and specialized course structures designed for global healthcare impact."
        breadcrumbs={["Academics"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className="portal-layout-grid">
            <aside className="sidebar-box">
              <div className="sidebar-card card-institutional">
                <span className="section-tag">Quick Metrics</span>
                <ul className="leader-list">
                  {admissionsHighlights.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-card card-institutional">
                <span className="section-tag">Regulations</span>
                <p className="muted margin-bottom" style={{ fontSize: "0.85rem" }}>
                   Standard R23 Academic Regulations prescribed by JNTU-GV are followed.
                </p>
                <ul className="footer-link-list">
                  {downloads.slice(0, 2).map((item) => (
                    <li key={item.title}>
                      <a href={item.file} target="_blank" rel="noreferrer" className="text-link">
                        {item.title} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="portal-main">
              <section className="portal-board">
                <div className="portal-board-head">
                  <h2>Programmes Offered</h2>
                  <span className="notice-pill">PCI Syllabi</span>
                </div>
                
                <div className="table-responsive margin-top">
                  <table className="institutional-table">
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
                          <td><strong className="text-link">{program.name}</strong></td>
                          <td>{program.duration}</td>
                          <td><span className="notice-pill">{program.status}</span></td>
                          <td>{program.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <article className="content-card-block card-institutional margin-top-xl">
                <span className="section-tag">Resources</span>
                <h2>Syllabus & Course Downloads</h2>
                <p className="muted">Access the official semester-wise syllabus and academic calendars for various programmes.</p>
                
                <div className="grid-res-2 margin-top">
                  {downloads.map((item) => (
                    <article className="card card-institutional" key={item.title}>
                      <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                      <p className="muted" style={{ fontSize: "0.85rem", margin: "0.5rem 0 1.5rem" }}>{item.description}</p>
                      <a className="button button-secondary" style={{ width: "fit-content", fontSize: "0.8rem" }} href={item.file} target="_blank" rel="noreferrer">
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
