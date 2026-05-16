import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import styles from "./notices.module.css";

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  noStore();
  const content = await getSiteContent();
  const notices = content.institutionalNotices || content.notices || [];

  return (
    <SiteShell content={content}>
      <PageHero
        title="Institutional Notices"
        description="Public announcements, statutory bulletins, and academic notifications for students and stakeholders."
        breadcrumbs={["Notices"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className={styles.layoutGrid}>
            <aside>
              <div className={styles.sidebarCard}>
                <span className={styles.sectionTag}>Notice Repository</span>
                <p className={styles.mutedText}>
                  This archive maintains official documentation and bulletins published by the institution.
                </p>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <div className={styles.stackedList}>
                {notices.map((notice, index) => (
                  <article className={styles.noticeCard} key={`${notice.title}-${index}`}>
                    <span className={styles.noticePill}>{notice.date}</span>
                    <h2 className={styles.noticeTitle}>{notice.title}</h2>
                    <p className={styles.noticeSummary}>{notice.summary}</p>
                    {notice.file && (
                      <a href={notice.file} target="_blank" rel="noreferrer" className={styles.docBtn}>
                        View Document (PDF)
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
