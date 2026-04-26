import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function FacilitiesPage() {
  noStore();
  const content = await getSiteContent();
  const { facilities } = content;

  return (
    <SiteShell content={content}>
      <PageHero
        title="Facilities"
        description="Infrastructure and student-facing facilities modeled as a full institutional route."
        breadcrumbs={["Facilities"]}
      />
      <ContentLayout
        sidebar={
          <div className="sidebar-card">
            <h3>Facility Areas</h3>
            <ul className="link-list">
              {facilities.map((item) => (
                <li key={item.title}>{item.title}</li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="feature-grid three-col">
          {facilities.map((facility) => (
            <article className="card" key={facility.title}>
              <h3>{facility.title}</h3>
              <p>{facility.description}</p>
            </article>
          ))}
        </div>
      </ContentLayout>
    </SiteShell>
  );
}
