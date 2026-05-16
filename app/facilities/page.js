import { unstable_noStore as noStore } from "next/cache";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import styles from "./facilities.module.css";

export const dynamic = "force-dynamic";

export default async function FacilitiesPage() {
  noStore();
  const content = await getSiteContent();
  const facilities = content.campusInfrastructure || content.facilities || [];

  return (
    <SiteShell content={content}>
      <PageHero
        title="Institutional Facilities"
        description="Explore our world-class infrastructure, specialized research laboratories, and student-centric support ecosystems."
        breadcrumbs={["Facilities"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className={styles.layoutGrid}>
            <aside>
              <div className={styles.sidebarCard}>
                <span className={styles.sectionTag}>Facility Quick-Link</span>
                <ul className={styles.linkList}>
                  {facilities.map((item) => (
                    <li key={item.title} className={styles.linkItem}>{item.title}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.sidebarCard}>
                <span className={styles.sectionTag}>Residential Status</span>
                <p className={styles.mutedText}>
                  The institution provides secure, gender-segregated residential halls within the campus premises, compliant with university housing norms.
                </p>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <div className={styles.facilityGrid}>
                {facilities.map((facility) => (
                  <article className={styles.facilityCard} key={facility.title}>
                    <span className={styles.noticePill}>Infrastructure</span>
                    <h3 className={styles.facilityTitle}>{facility.title}</h3>
                    <p className={styles.facilityDesc}>{facility.description}</p>
                  </article>
                ))}
              </div>

              <article className={styles.campusBanner}>
                <span className={styles.bannerTag}>Campus Life</span>
                <h2 className={styles.bannerTitle}>Holistic Student Ecosystem</h2>
                <p className={styles.bannerLead}>
                  Beyond academic infrastructure, JNTU-GV CPSV offers a comprehensive ecosystem including diagnostic labs, digital libraries, and wellness centers to ensure the holistic development of pharmaceutical scholars.
                </p>
              </article>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
