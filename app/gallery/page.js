import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  noStore();
  const content = await getSiteContent();
  const { gallery } = content;

  return (
    <SiteShell content={content}>
      <PageHero
        title="Photo Gallery"
        description="Selected campus, infrastructure, and event images sourced from the broader JNTU-GV asset folders."
        breadcrumbs={["Gallery"]}
      />
      <ContentLayout
        sidebar={
          <div className="sidebar-card">
            <h3>Gallery Categories</h3>
            <ul className="link-list">
              {[...new Set(gallery.map((item) => item.category))].map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <article className="gallery-card" key={`${item.title}-${index}`}>
              <div className="gallery-image-wrap">
                <Image src={item.image} alt={item.title} width={800} height={540} />
              </div>
              <div className="gallery-body">
                <span className="notice-pill">{item.category}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </ContentLayout>
    </SiteShell>
  );
}
