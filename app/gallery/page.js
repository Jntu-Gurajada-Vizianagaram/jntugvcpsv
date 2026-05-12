import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

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
          <div className="portal-layout-grid">
            <aside className="sidebar-box">
              <div className="sidebar-card card-institutional">
                <span className="section-tag">Categories</span>
                <ul className="footer-link-list">
                  {[...new Set(gallery.map((item) => item.category))].map((category) => (
                    <li key={category} className="text-link" style={{ fontSize: '0.9rem' }}>• {category}</li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="portal-main">
              <div className="grid-res-2">
                {gallery.map((item, index) => (
                  <article className="gallery-card card-institutional" key={`${item.title}-${index}`}>
                    <div className="gallery-image-wrap">
                      <img src={item.image} alt={item.title} className="principal-img" style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
                    </div>
                    <div className="gallery-body" style={{ padding: '1rem 0' }}>
                      <span className="notice-pill">{item.category}</span>
                      <h3 className="faculty-name" style={{ marginTop: '0.75rem' }}>{item.title}</h3>
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
