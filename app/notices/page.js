import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  noStore();
  const content = await getSiteContent();
  const { notices } = content;

  return (
    <SiteShell content={content}>
      <PageHero
        title="Notices"
        description="Institutional notices, updates, and public announcements."
        breadcrumbs={["Notices"]}
      />
      <ContentLayout
        sidebar={
          <div className="sidebar-card">
            <h3>Notice Board</h3>
            <p>The CMS can publish notices here in a route-based format similar to other JNTU-GV college sites.</p>
          </div>
        }
      >
        <div className="stacked-sections">
          {notices.map((notice, index) => (
            <article className="content-card-block notice-detail" key={`${notice.title}-${index}`}>
              <span className="notice-pill">{notice.date}</span>
              <h2>{notice.title}</h2>
              <p>{notice.summary}</p>
            </article>
          ))}
        </div>
      </ContentLayout>
    </SiteShell>
  );
}
