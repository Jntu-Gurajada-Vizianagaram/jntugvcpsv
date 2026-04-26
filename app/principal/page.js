import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import { getPrincipal } from "@/lib/content-helpers";

export const dynamic = "force-dynamic";

export default async function PrincipalPage() {
  noStore();
  const content = await getSiteContent();
  const principal = getPrincipal(content.faculty);
  const principalProfile = content.principalProfile;

  return (
    <SiteShell content={content}>
      <PageHero
        title="Principal's Desk"
        description="Message and profile of the Principal I/c of JNTU-GV College of Pharmaceutical Sciences."
        breadcrumbs={["Principal's Desk"]}
      />
      <ContentLayout
        sidebar={
          <div className="sidebar-card">
            <h3>Quick Access</h3>
            <ul className="link-list">
              <li>
                <Link href="/administration">Administration</Link>
              </li>
              <li>
                <Link href="/faculty">Faculty Directory</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        }
      >
        <article className="principal-panel">
          <div className="principal-photo">
            <Image src={principal.image} alt={principal.name} width={420} height={520} />
          </div>
          <div className="principal-body">
            <span className="notice-pill">{principal.designation}</span>
            <h2>{principal.name}</h2>
            <p>{principal.department}</p>
            <p><strong>Experience:</strong> {principal.experience}</p>
            <p><strong>Email:</strong> {principal.email}</p>
            <div className="principal-message">
              <h3>{principalProfile.title}</h3>
              <p>{principalProfile.message}</p>
            </div>
          </div>
        </article>
      </ContentLayout>
    </SiteShell>
  );
}
