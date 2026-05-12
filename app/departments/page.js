import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function DepartmentsPage() {
  noStore();
  const content = await getSiteContent();
  const departments = content.academicDepartments || content.departments || [];

  return (
    <SiteShell content={content}>
      <PageHero
        title="Academic Departments"
        description="Our specialized divisions drive the core of pharmaceutical education, research, and professional training."
        breadcrumbs={["Departments"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className="portal-layout-grid">
            <aside className="sidebar-box">
              <div className="sidebar-card card-institutional">
                <span className="section-tag">Divisions</span>
                <ul className="footer-link-list">
                  {departments.map((item) => (
                    <li key={item.title} className="text-link" style={{ fontSize: '0.9rem' }}>• {item.title}</li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="portal-main">
              <div className="grid-res-2">
                {departments.map((dept) => (
                  <article className="card card-institutional" key={dept.title}>
                    <span className="notice-pill">Academic Division</span>
                    <h3 className="faculty-name" style={{ marginTop: '0.75rem' }}>{dept.title}</h3>
                    <p className="muted" style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>{dept.description}</p>
                  </article>
                ))}
              </div>

              <article className="content-card-block card-institutional text-center margin-top-xl">
                <span className="section-tag">Interdisciplinary Research</span>
                <h2>Integrated Pharmaceutical Learning</h2>
                <p className="lead" style={{ margin: '1.5rem auto' }}>
                  Our departments collaborate across domains to provide a multidisciplinary environment for pharmaceutical research, ensuring students are well-versed in both clinical practice and industrial development.
                </p>
              </article>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
