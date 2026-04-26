import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function DepartmentsPage() {
  noStore();
  const content = await getSiteContent();
  const { departments } = content;

  return (
    <> </>
    //   <SiteShell content={content}>
    //     <PageHero
    //       title="Departments"
    //       description="Academic domains and core areas in pharmacy education and research."
    //       breadcrumbs={["Departments"]}
    //     />
    //     <ContentLayout
    //       sidebar={
    //         <div className="sidebar-card">
    //           <h3>Department Areas</h3>
    //           <ul className="link-list">
    //             {departments.map((item) => (
    //               <li key={item.title}>{item.title}</li>
    //             ))}
    //           </ul>
    //         </div>
    //       }
    //     >
    //       <div className="feature-grid three-col">
    //         {departments.map((department) => (
    //           <article className="card" key={department.title}>
    //             <h3>{department.title}</h3>
    //             <p>{department.description}</p>
    //           </article>
    //         ))}
    //       </div>
    //     </ContentLayout>
    //   </SiteShell>
  );
}
