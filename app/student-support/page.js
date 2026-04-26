import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function StudentSupportPage() {
  noStore();
  const content = await getSiteContent();
  const { studentSupportItems } = content;

  return (
    <SiteShell content={content}>
      <PageHero
        title="Student Support"
        description="Support services, grievance systems, anti-ragging guidance, and student wellbeing blocks."
        breadcrumbs={["Student Support"]}
      />
      <ContentLayout
        sidebar={
          <div className="sidebar-card">
            <h3>Support Services</h3>
            <ul className="link-list">
              {studentSupportItems.map((item) => (
                <li key={item.title}>{item.title}</li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="feature-grid four-col">
          {studentSupportItems.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </ContentLayout>
    </SiteShell>
  );
}
