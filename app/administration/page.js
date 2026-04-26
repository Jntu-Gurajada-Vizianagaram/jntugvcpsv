import Link from "next/link";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import { getPrincipal } from "@/lib/content-helpers";

export const dynamic = "force-dynamic";

export default async function AdministrationPage() {
  noStore();
  const content = await getSiteContent();
  const { universityLeadership, governanceFramework } = content;
  const principal = getPrincipal(content.facultyRepository);

  return (
    <SiteShell content={content}>
      <PageHero
        title="Leadership & Statutory Administration"
        description="The executive leadership framework and governance structure of the JNTU-GV College of Pharmaceutical Sciences."
        breadcrumbs={["Institutional Governance"]}
      />
      <ContentLayout
        sidebar={
          <div className="stacked-sections">
            <div className="sidebar-card card-institutional" style={{ padding: '1.5rem' }}>
              <h3 className="section-tag">Governance Protocols</h3>
              <ul className="bullet-list-minimal">
                <li>UGC Statutory Disclosures</li>
                <li>University Senate Orders</li>
                <li>Strategic Academic Plan</li>
                <li>Ombudsman Appointments</li>
              </ul>
            </div>
            <div className="sidebar-card" style={{ padding: '1.5rem' }}>
              <h3 className="section-tag">Executive Desk</h3>
              <div className="principal-mini-portrait" style={{ margin: "1rem 0" }}>
                <Image
                  src={principal.image}
                  alt={principal.name}
                  width={220}
                  height={240}
                  style={{ borderRadius: "12px", objectFit: "cover" }}
                />
              </div>
              <p style={{ fontWeight: 700 }}>{principal.name}</p>
              <Link href="/principal" className="button button-primary" style={{ display: "block", marginTop: "1rem", textAlign: "center" }}>
                View Message & Bio
              </Link>
            </div>
          </div>
        }
      >
        <section className="admin-section">
          <div className="section-heading-compact">
            <h2>University Apex Leadership</h2>
            <p>Direct governance from the Jawaharlal Nehru Technological University - Gurajada Vizianagaram administration.</p>
          </div>
          <div className="leadership-grid">
            {universityLeadership.map((leader) => (
              <article className="leader-card-box" key={leader.role}>
                <div className="leader-title-wrap">
                  <span className="role-tag">{leader.role}</span>
                  <h3>{leader.name}</h3>
                  <p className="muted">{leader.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-section margin-top-xl">
          <div className="section-heading-compact">
            <h2>Institutional Administration</h2>
            <p>The academic and administrative leadership team responsible for institutional excellence and statutory compliance.</p>
          </div>
          <div className="principal-lead-card card-institutional" style={{ padding: '2rem' }}>
            <div className="split-info" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "2rem", alignItems: "center" }}>
              <Image
                src={principal.image}
                alt="Principal"
                width={200}
                height={260}
                style={{ borderRadius: "12px", objectFit: "cover" }}
              />
              <div>
                <span className="role-tag">{principal.designation}</span>
                <h3 style={{ fontSize: "1.8rem" }}>{principal.name}</h3>
                <p className="lead" style={{ color: 'var(--primary)', fontWeight: 600 }}>{principal.department}</p>
                <p style={{ margin: "1rem 0" }}>{principal.experience}</p>
                <Link href="/principal" className="text-link">Leadership Profile & Bio-Data →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="admin-section margin-top-xl">
          <div className="section-heading-compact">
            <h2>Statutory Governance Framework</h2>
          </div>
          <div className="feature-grid two-col">
            {governanceFramework.map((item) => (
              <article className="card-minimal card-institutional" key={item.title} style={{ padding: '1.5rem' }}>
                <h3 className="section-tag" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", width: '100%' }}>{item.title}</h3>
                <p style={{ marginTop: "0.5rem" }}>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-section margin-top-xl">
          <div className="content-card-block card-institutional" style={{ padding: '2rem' }}>
            <h2>Institutional Committees</h2>
            <p>In adherence to UGC and PCI statutory requirements, the following cells are constituted for quality assurance and grievance redressal:</p>
            <div className="committee-list-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              {[
                "Institutional Governing Body",
                "Internal Quality Assurance Cell (IQAC)",
                "Anti-Ragging Vigilance Cell",
                "Internal Complaint Commission (ICC)",
                "SC/ST Empowerment Cell",
                "Ombudsman & Grievance Redressal"
              ].map((committee) => (
                <div key={committee} className="committee-item" style={{ padding: '0.75rem', borderLeft: '3px solid var(--accent)', background: 'var(--bg-soft)', fontSize: '0.9rem', fontWeight: 600 }}>
                  {committee}
                </div>
              ))}
            </div>
            <div className="margin-top">
              <Link href="/mandatory-disclosure" className="button button-primary">Examine Statutory Orders</Link>
            </div>
          </div>
        </section>
      </ContentLayout>
    </SiteShell>
  );
}
