import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import { enrichFaculty, getPrincipal } from "@/lib/content-helpers";
import styles from "./faculty.module.css";

export const dynamic = "force-dynamic";

export default async function FacultyPage() {
  noStore();
  const content = await getSiteContent();
  const allFaculty = enrichFaculty(content.facultyRepository);
  const teachingStaff = allFaculty.filter(m => m.type === "teaching");
  const adminStaff = allFaculty.filter(m => m.type === "administration");
  const { scholarlyDownloads } = content;
  const principal = getPrincipal(allFaculty);

  return (
    <SiteShell content={content}>
      <PageHero
        title="Our Faculty"
        description="Meet our dedicated team of pharmaceutical scientists and academic experts committed to excellence in teaching and research."
        breadcrumbs={["Faculty"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className={styles.layoutGrid}>
            <aside>
              <div className={styles.sidebarCard}>
                <span className={styles.sectionTag}>Principal</span>
                <div className={styles.principalProfile}>
                  <div className={styles.principalPhoto}>
                    <Image src={principal.image} alt={principal.name} width={300} height={300} className={styles.principalImg} />
                  </div>
                  <h3 className={styles.principalName}>{principal.name}</h3>
                  <p className={styles.principalDesc}>{principal.designation}</p>
                  <Link href="/principal" className={styles.primaryBtn}>
                    View Profile
                  </Link>
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <span className={styles.sectionTag}>Resources</span>
                <ul className={styles.linkList}>
                  {(scholarlyDownloads || []).slice(0, 5).map((item) => (
                    <li key={item.title}>
                      <a href={item.file} target="_blank" rel="noreferrer" className={styles.linkItem}>
                        {item.title} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <section className={styles.boardSection}>
                <div className={styles.boardHead}>
                  <h2 className={styles.boardTitle}>Teaching Staff</h2>
                </div>
                <div className={styles.facultyGrid}>
                  {teachingStaff.map((member) => (
                    <FacultyMemberCard key={member.name} member={member} />
                  ))}
                </div>
              </section>

              {adminStaff.length > 0 && (
                <section className={styles.boardSection}>
                  <div className={styles.boardHead}>
                    <h2 className={styles.boardTitle}>Administrative Staff</h2>
                  </div>
                  <div className={styles.facultyGrid}>
                    {adminStaff.map((member) => (
                      <FacultyMemberCard key={member.name} member={member} />
                    ))}
                  </div>
                </section>
              )}

              <article className={styles.commitmentBanner}>
                <span className={styles.sectionTag}>Our Commitment</span>
                <h2 className={styles.bannerTitle}>Academic Excellence</h2>
                <p className={styles.bannerLead}>
                  Our faculty uphold the highest standards of research ethics and quality teaching, in accordance with the guidelines of JNTU-GV and the Pharmacy Council of India.
                </p>
                <Link href="/mandatory-disclosure" className={styles.secondaryBtn}>View Mandatory Disclosure →</Link>
              </article>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}

function FacultyMemberCard({ member }) {
  return (
    <article className={styles.facultyCard}>
      <div className={styles.memberPhotoWrap}>
        <Image
          src={member.image || "/placeholder-faculty.jpg"}
          alt={member.name}
          width={320}
          height={400}
          className={styles.memberImg}
        />
      </div>
      <div className={styles.memberBody}>
        <div>
          <span className={styles.noticePill}>{member.designation}</span>
          <h3 className={styles.memberName}>{member.name}</h3>
          <p className={styles.memberDept}>{member.department}</p>
          <div className={styles.memberMeta}>
            <p><strong>Experience: </strong><span>{member.experience.split(' ')[0]} Years+</span></p>
          </div>
        </div>
        <div className={styles.memberActions}>
          <Link className={styles.secondaryBtn} href={`/faculty/${member.slug}`}>
            Profile
          </Link>
          <a href={`mailto:${member.email}`} className={styles.primaryBtn}>
            Email
          </a>
        </div>
      </div>
    </article>
  );
}
