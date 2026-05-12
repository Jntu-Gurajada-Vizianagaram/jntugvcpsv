import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function StudentSupportPage() {
  noStore();
  const content = await getSiteContent();
  const supportItems = content.studentWelfareSupport || content.studentSupportItems || [];

  return (
    <SiteShell content={content}>
      <PageHero
        title="Student Support & Welfare"
        description="Support services, grievance systems, anti-ragging guidance, and student wellbeing blocks."
        breadcrumbs={["Student Support"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className="portal-layout-grid">
            <aside className="sidebar-box">
              <div className="sidebar-card card-institutional">
                <span className="section-tag">Welfare Cells</span>
                <ul className="footer-link-list">
                  {supportItems.map((item) => (
                    <li key={item.title} className="text-link" style={{ fontSize: '0.9rem' }}>• {item.title}</li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="portal-main">
              <div className="grid-res-2">
                {supportItems.map((item) => (
                  <article className="card card-institutional" key={item.title}>
                    <span className="notice-pill">Support Cell</span>
                    <h3 className="faculty-name" style={{ marginTop: '0.75rem' }}>{item.title}</h3>
                    <p className="muted" style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>{item.description}</p>
                  </article>
                ))}
              </div>

              <article className="content-card-block card-institutional text-center margin-top-xl">
                <span className="section-tag">Institutional Care</span>
                <h2>Commitment to Student Wellbeing</h2>
                <p className="lead" style={{ margin: '1.5rem auto' }}>
                  Our institution prioritizes the safety, mental health, and academic success of every student through structured grievance cells and active faculty mentorship.
                </p>
              </article>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
