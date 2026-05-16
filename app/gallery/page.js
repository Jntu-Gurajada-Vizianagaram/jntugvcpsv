import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import styles from "./gallery.module.css";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  noStore();
  const content = await getSiteContent();
  const gallery = content.institutionalGallery || content.gallery || [];

  return (
    <SiteShell content={content}>
      <PageHero
        title="Photo Gallery"
        description="Selected campus, infrastructure, and event images sourced from the broader JNTU-GV asset folders."
        breadcrumbs={["Gallery"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className={styles.layoutGrid}>
            <aside>
              <div className={styles.sidebarCard}>
                <span className={styles.sectionTag}>Categories</span>
                <ul className={styles.linkList}>
                  {[...new Set(gallery.map((item) => item.category))].map((category) => (
                    <li key={category} className={styles.linkItem}>{category}</li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <div className={styles.galleryGrid}>
                {gallery.map((item, index) => (
                  <article className={styles.galleryCard} key={`${item.title}-${index}`}>
                    <div className={styles.imageWrap}>
                      <img src={item.image} alt={item.title} className={styles.galleryImg} />
                    </div>
                    <div className={styles.galleryBody}>
                      <span className={styles.noticePill}>{item.category}</span>
                      <h3 className={styles.galleryTitle}>{item.title}</h3>
                    </div>
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
