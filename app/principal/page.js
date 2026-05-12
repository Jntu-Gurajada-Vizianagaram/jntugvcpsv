import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import { getPrincipal } from "@/lib/content-helpers";

export const dynamic = "force-dynamic";

export default async function PrincipalPage() {
  noStore();
  const content = await getSiteContent();
  const principal = getPrincipal(content.facultyRepository || content.faculty || []);
  const principalMessage = content.principalsMessage || content.principalProfile || { title: "Principal's Desk", message: "" };

  return (
    <SiteShell content={content}>
      <PageHero
        title="Principal's Desk"
        description="Strategic leadership and academic vision from the Principal of JNTU-GV College of Pharmaceutical Sciences."
        breadcrumbs={["Principal's Desk"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className="portal-layout-grid">
            <aside className="sidebar-box">
              <div className="sidebar-card card-institutional">
                <span className="section-tag">Direct Coordinates</span>
                <div className="contact-item" style={{ marginTop: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '0.85rem' }}>Official Email</strong>
                  <span className="muted" style={{ fontSize: '0.95rem' }}>{principal.email}</span>
                </div>
                <div className="contact-item" style={{ marginTop: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '0.85rem' }}>Academic Experience</strong>
                  <span className="muted" style={{ fontSize: '0.95rem' }}>{principal.experience}</span>
                </div>
              </div>

              <div className="sidebar-card card-institutional">
                <span className="section-tag">Related Portals</span>
                <ul className="footer-link-list">
                  <li><Link href="/administration" className="text-link">• Governance Framework</Link></li>
                  <li><Link href="/faculty" className="text-link">• Faculty Repository</Link></li>
                  <li><Link href="/contact" className="text-link">• Administrative Connect</Link></li>
                </ul>
              </div>
            </aside>

            <div className="portal-main">
              <article className="content-card-block card-institutional">
                <div className="principal-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 300px) 1fr', gap: '2.5rem' }}>
                  <div className="principal-photo-wrap">
                    <img src={principal.image} alt={principal.name} style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: 'var(--shadow)' }} />
                  </div>
                  <div className="principal-details">
                    <span className="notice-pill">{principal.designation}</span>
                    <h2 style={{ marginTop: '0.75rem', fontSize: '2rem' }}>{principal.name}</h2>
                    <p className="lead" style={{ color: 'var(--primary)', fontWeight: 700, marginTop: '0.5rem' }}>{principal.department}</p>
                    
                    <div className="principal-message-body margin-top-xl">
                      <h3 className="section-tag" style={{ background: 'none', borderBottom: '2px solid var(--gold)', borderRadius: 0, padding: '0 0 0.5rem 0' }}>
                        {principalMessage.title}
                      </h3>
                      <p className="margin-top" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--navy)', lineHeight: 1.8 }}>
                        "{principalMessage.message}"
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <article className="content-card-block card-institutional margin-top-xl">
                <h3>Scholarly Profile</h3>
                <p className="muted">
                  {principal.profile || "The Principal oversees the academic and administrative excellence of the institution, ensuring a robust research environment and statutory compliance."}
                </p>
              </article>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
