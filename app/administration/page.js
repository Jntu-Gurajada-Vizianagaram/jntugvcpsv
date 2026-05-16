import Link from "next/link";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import { getPrincipal } from "@/lib/content-helpers";
import styles from "./administration.module.css";

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
          <div className={styles.layoutGrid}>
            <aside>
              <div className={styles.sidebarCard}>
                <span className={styles.sectionTag}>Governance Protocols</span>
                <ul className={styles.bulletList}>
                  <li>UGC Statutory Disclosures</li>
                  <li>University Senate Orders</li>
                  <li>Strategic Academic Plan</li>
                  <li>Ombudsman Appointments</li>
                </ul>
              </div>

              <div className={styles.sidebarCard}>
                <span className={styles.sectionTag}>Executive Desk</span>
                <div className={styles.principalMiniWrap}>
                  <Image
                    src={principal.image}
                    alt={principal.name}
                    width={300}
                    height={360}
                    className={styles.principalMiniImg}
                  />
                </div>
                <p className={styles.principalName}>{principal.name}</p>
                <Link href="/principal" className={styles.viewBtn}>
                  View Message & Bio
                </Link>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <section>
                <div className={styles.sectionHeading}>
                  <span className={styles.sectionTag}>Apex Authority</span>
                  <h2 className={styles.sectionTitle}>University Leadership</h2>
                  <p className={styles.mutedText}>Direct governance from the Jawaharlal Nehru Technological University - Gurajada Vizianagaram administration.</p>
                </div>
                <div className={styles.leaderGrid}>
                  {universityLeadership.map((leader) => (
                    <article className={styles.leaderCard} key={leader.role}>
                      <div className={styles.leaderPhotoWrap}>
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          width={80}
                          height={80}
                          unoptimized={leader.image.startsWith("http")}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      </div>
                      <div>
                        <span className={styles.roleTag}>{leader.role}</span>
                        <h3 className={styles.leaderName}>{leader.name}</h3>
                        <p className={styles.leaderDetail}>{leader.detail}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <div className={styles.sectionHeading}>
                  <span className={styles.sectionTag}>Institutional Executive</span>
                  <h2 className={styles.sectionTitle}>College Administration</h2>
                </div>
                <div className={styles.contentCard}>
                  <div className={styles.principalLayout}>
                    <div className={styles.principalPhotoWrap}>
                      <Image
                        src={principal.image}
                        alt="Principal"
                        width={180}
                        height={220}
                        style={{ width: '100%', height: 'auto', objectFit: "cover", display: 'block' }}
                      />
                    </div>
                    <div>
                      <span className={styles.noticePill}>{principal.designation}</span>
                      <h3 className={styles.sectionTitle}>{principal.name}</h3>
                      <p className={styles.mutedText} style={{ fontWeight: 600, marginBottom: '1rem' }}>{principal.department}</p>
                      <Link href="/principal" className={styles.textLink}>Leadership Profile & Bio-Data →</Link>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className={styles.sectionHeading}>
                  <span className={styles.sectionTag}>Statutory Framework</span>
                  <h2 className={styles.sectionTitle}>Governance Pillars</h2>
                </div>
                <div className={styles.frameworkGrid}>
                  {governanceFramework.map((item) => (
                    <article className={styles.frameworkCard} key={item.title}>
                      <h3 className={styles.frameworkTitle}>{item.title}</h3>
                      <p className={styles.frameworkDesc}>{item.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <div className={styles.contentCard}>
                  <span className={styles.sectionTag}>Quality Assurance</span>
                  <h2 className={styles.sectionTitle}>Statutory Committees</h2>
                  <p className={styles.mutedText} style={{ marginBottom: '2rem' }}>In adherence to regulatory requirements, the following cells are active for quality assurance and grievance redressal:</p>
                  <div className={styles.frameworkGrid}>
                    {[
                      "Institutional Governing Body",
                      "Internal Quality Assurance Cell (IQAC)",
                      "Anti-Ragging Vigilance Cell",
                      "Internal Complaint Commission (ICC)",
                      "SC/ST Empowerment Cell",
                      "Ombudsman & Grievance Redressal"
                    ].map((committee) => (
                      <div key={committee} className={styles.committeeItem}>
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
