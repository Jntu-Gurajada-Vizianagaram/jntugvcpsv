import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
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
      <ContentLayout
        sidebar={
          <div className="stacked-sections">
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
            <div className="sidebar-card">
              <h3>Academic Regulations</h3>
              <p className="muted" style={{ fontSize: "0.85rem", marginBottom: "1rem" }}>
                 Standard R23 Academic Regulations prescribed by JNTU-GV are followed.
              </p>
              <ul className="link-list">
                {downloads.slice(0, 2).map((item) => (
                  <li key={item.title}>
                    <a href={item.file} target="_blank" rel="noreferrer" style={{ fontWeight: "600" }}>
                      {item.title} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      >
        <section className="portal-main">
          <div className="portal-board">
             <div className="portal-board-head">
                <h2>Programmes Offered</h2>
                <span className="badge-ugc">PCI Syllabi</span>
             </div>
             
             <div className="table-card" style={{ border: "none", boxShadow: "none" }}>
               <table>
                 <thead>
                   <tr>
                     <th>Programme Name</th>
                     <th>Core Duration</th>
                     <th>Affiliation Status</th>
                     <th>Specialized Note</th>
                   </tr>
                 </thead>
                 <tbody>
                   {academicPrograms.map((program, index) => (
                     <tr key={`${program.name}-${index}`}>
                       <td><strong style={{ color: "var(--primary)" }}>{program.name}</strong></td>
                       <td>{program.duration}</td>
                       <td><span className="status-badge" style={{ padding: "0.25rem 0.5rem", borderRadius: "6px", background: "var(--gold-soft)", fontSize: "0.75rem", fontWeight: "700" }}>{program.status}</span></td>
                       <td style={{ fontSize: "0.85rem", opacity: 0.8 }}>{program.note}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>

          <article className="content-card-block">
            <span className="section-tag">Resources</span>
            <h2>Syllabus & Course Downloads</h2>
            <p className="muted">Access the official semester-wise syllabus and academic calendars for various programmes.</p>
            
            <div className="feature-grid two-col" style={{ marginTop: "1.5rem" }}>
              {downloads.map((item) => (
                <article className="card card-institutional" key={item.title}>
                  <h3>{item.title}</h3>
                  <p style={{ fontSize: "0.85rem", margin: "0.5rem 0 1rem" }}>{item.description}</p>
                  <a className="button button-secondary" style={{ width: "fit-content", fontSize: "0.8rem" }} href={item.file} target="_blank" rel="noreferrer">
                    Download Resource (PDF)
                  </a>
                </article>
              ))}
            </div>
          </article>
        </section>
      </ContentLayout>
    </SiteShell>
  );
}
