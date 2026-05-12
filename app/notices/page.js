import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

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
          <div className="portal-layout-grid">
            <aside className="sidebar-box">
              <div className="sidebar-card card-institutional">
                <span className="section-tag">Notice Repository</span>
                <p className="muted" style={{ fontSize: '0.85rem' }}>
                  This archive maintains official documentation and bulletins published by the institution.
                </p>
              </div>
            </aside>

            <div className="portal-main">
              <div className="stacked-sections">
                {notices.map((notice, index) => (
                  <article className="content-card-block card-institutional" key={`${notice.title}-${index}`}>
                    <span className="notice-pill">{notice.date}</span>
                    <h2 className="margin-top-sm">{notice.title}</h2>
                    <p className="margin-top">{notice.summary}</p>
                    {notice.file && (
                      <a href={notice.file} target="_blank" rel="noreferrer" className="button button-secondary margin-top" style={{ width: 'fit-content' }}>
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
