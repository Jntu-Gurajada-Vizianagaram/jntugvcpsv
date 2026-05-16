import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import styles from "./student-support.module.css";

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
          <div className={styles.layoutGrid}>
            <aside>
              <div className={styles.sidebarCard}>
                <span className={styles.sectionTag}>Welfare Cells</span>
                <ul className={styles.linkList}>
                  {supportItems.map((item) => (
                    <li key={item.title} className={styles.linkItem}>{item.title}</li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <div className={styles.supportGrid}>
                {supportItems.map((item) => (
                  <article className={styles.supportCard} key={item.title}>
                    <span className={styles.noticePill}>Support Cell</span>
                    <h3 className={styles.supportTitle}>{item.title}</h3>
                    <p className={styles.supportDesc}>{item.description}</p>
                  </article>
                ))}
              </div>

              <article className={styles.commitmentBanner}>
                <span className={styles.sectionTag}>Institutional Care</span>
                <h2 className={styles.bannerTitle}>Commitment to Student Wellbeing</h2>
                <p className={styles.bannerLead}>
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
