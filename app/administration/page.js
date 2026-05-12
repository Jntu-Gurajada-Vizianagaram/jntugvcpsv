import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import { getPrincipal } from "@/lib/content-helpers";

export const dynamic = "force-dynamic";

export default async function AdministrationPage() {
  noStore();
  const content = await getSiteContent();
  const { universityLeadership, governanceFramework } = content;
  const principal = getPrincipal(content.facultyRepository || []);

  return (
    <SiteShell content={content}>
      <PageHero
        title="Leadership & Governance"
        description="The executive leadership framework and statutory governance structure of the JNTU-GV College of Pharmaceutical Sciences."
        breadcrumbs={["Institutional Governance"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className="portal-layout-grid">
            <aside className="sidebar-box">
              <div className="sidebar-card card-institutional">
                <span className="section-tag">Governance Protocols</span>
                <ul className="bullet-list-minimal">
                  <li>UGC Statutory Disclosures</li>
                  <li>University Senate Orders</li>
                  <li>Strategic Academic Plan</li>
                  <li>Ombudsman Appointments</li>
                </ul>
              </div>

              <div className="sidebar-card card-institutional">
                <span className="section-tag">Executive Desk</span>
                <div className="principal-mini-portrait" style={{ margin: "1.5rem 0" }}>
                  <img
                    src={principal.image}
                    alt={principal.name}
                    style={{ width: '100%', borderRadius: "12px", objectFit: "cover", boxShadow: 'var(--shadow)' }}
                  />
                </div>
                <p style={{ fontWeight: 700, color: 'var(--primary)' }}>{principal.name}</p>
                <Link href="/principal" className="button button-primary" style={{ display: "block", marginTop: "1rem", textAlign: "center", fontSize: '0.85rem' }}>
                  View Message & Bio
                </Link>
              </div>
            </aside>

            <div className="portal-main">
              <section className="admin-block">
                <div className="section-heading-compact">
                  <span className="section-tag">Apex Authority</span>
                  <h2>University Leadership</h2>
                  <p className="muted">Direct governance from the Jawaharlal Nehru Technological University - Gurajada Vizianagaram administration.</p>
                </div>
                <div className="grid-res-2 margin-top">
                  {universityLeadership.map((leader) => (
                    <article className="leader-card-box card-institutional" key={leader.role}>
                      <span className="role-tag">{leader.role}</span>
                      <h3 className="faculty-name" style={{ marginTop: '0.5rem' }}>{leader.name}</h3>
                      <p className="muted" style={{ fontSize: '0.85rem' }}>{leader.detail}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="admin-block margin-top-xl">
                <div className="section-heading-compact">
                  <span className="section-tag">Institutional Executive</span>
                  <h2>College Administration</h2>
                </div>
                <div className="content-card-block card-institutional">
                  <div className="principal-layout" style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '2rem', alignItems: 'center' }}>
                    <img src={principal.image} alt="Principal" style={{ width: '100%', borderRadius: "12px", objectFit: "cover" }} />
                    <div>
                      <span className="notice-pill">{principal.designation}</span>
                      <h3 style={{ fontSize: "1.5rem", marginTop: '0.5rem' }}>{principal.name}</h3>
                      <p className="muted" style={{ fontWeight: 600 }}>{principal.department}</p>
                      <Link href="/principal" className="text-link" style={{ marginTop: '0.5rem', display: 'block' }}>Leadership Profile & Bio-Data →</Link>
                    </div>
                  </div>
                </div>
              </section>

              <section className="admin-block margin-top-xl">
                <div className="section-heading-compact">
                  <span className="section-tag">Statutory Framework</span>
                  <h2>Governance Pillars</h2>
                </div>
                <div className="grid-res-2 margin-top">
                  {governanceFramework.map((item) => (
                    <article className="card card-institutional" key={item.title}>
                      <h3 className="faculty-name" style={{ fontSize: '1.1rem' }}>{item.title}</h3>
                      <p className="muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{item.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="admin-block margin-top-xl">
                <div className="content-card-block card-institutional">
                  <span className="section-tag">Quality Assurance</span>
                  <h2>Statutory Committees</h2>
                  <p className="muted">In adherence to regulatory requirements, the following cells are active for quality assurance and grievance redressal:</p>
                  <div className="grid-res-2 margin-top">
                    {[
                      "Institutional Governing Body",
                      "Internal Quality Assurance Cell (IQAC)",
                      "Anti-Ragging Vigilance Cell",
                      "Internal Complaint Commission (ICC)",
                      "SC/ST Empowerment Cell",
                      "Ombudsman & Grievance Redressal"
                    ].map((committee) => (
                      <div key={committee} className="committee-item" style={{ padding: '0.75rem', borderLeft: '3px solid var(--gold)', background: 'var(--bg-soft)', fontSize: '0.85rem', fontWeight: 700 }}>
                        {committee}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
