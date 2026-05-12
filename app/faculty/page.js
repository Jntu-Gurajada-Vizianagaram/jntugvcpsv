import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import { enrichFaculty, getPrincipal } from "@/lib/content-helpers";

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
          <div className="portal-layout-grid">
            <aside className="sidebar-box">
              <div className="sidebar-card card-institutional">
                <span className="section-tag">Principal</span>
                <div className="principal-mini-profile">
                  <div className="faculty-photo">
                    <Image src={principal.image} alt={principal.name} width={300} height={300} className="principal-img" />
                  </div>
                  <h3>{principal.name}</h3>
                  <p className="muted">{principal.designation}</p>
                  <Link href="/principal" className="button button-primary" style={{ width: "100%", marginTop: "1rem" }}>
                    View Profile
                  </Link>
                </div>
              </div>

              <div className="sidebar-card card-institutional">
                <span className="section-tag">Resources</span>
                <ul className="footer-link-list">
                  {scholarlyDownloads.slice(0, 5).map((item) => (
                    <li key={item.title}>
                      <a href={item.file} target="_blank" rel="noreferrer" className="text-link">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="portal-main">
              <section className="portal-board">
                <div className="portal-board-head">
                  <h2>Teaching Staff</h2>
                </div>
                <div className="faculty-grid">
                  {teachingStaff.map((member) => (
                    <FacultyMemberCard key={member.name} member={member} />
                  ))}
                </div>
              </section>

              {adminStaff.length > 0 && (
                <section className="portal-board margin-top-xl">
                  <div className="portal-board-head">
                    <h2>Administrative Staff</h2>
                  </div>
                  <div className="faculty-grid">
                    {adminStaff.map((member) => (
                      <FacultyMemberCard key={member.name} member={member} />
                    ))}
                  </div>
                </section>
              )}

              <article className="content-card-block card-institutional text-center margin-top-xl">
                <span className="section-tag">Our Commitment</span>
                <h2>Academic Excellence</h2>
                <p className="lead" style={{ margin: "1.5rem auto" }}>
                  Our faculty uphold the highest standards of research ethics and quality teaching, in accordance with the guidelines of JNTU-GV and the Pharmacy Council of India.
                </p>
                <Link href="/mandatory-disclosure" className="text-link">View Mandatory Disclosure →</Link>
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
    <article className="faculty-card card-institutional">
      <div className="faculty-photo">
        <Image
          src={member.image || "/placeholder-faculty.jpg"}
          alt={member.name}
          width={320}
          height={400}
          className="principal-img"
        />
      </div>
      <div className="faculty-body">
        <div>
          <span className="notice-pill">{member.designation}</span>
          <h3 className="faculty-name">{member.name}</h3>
          <p className="faculty-dept">{member.department}</p>
          <div className="faculty-meta">
            <p><strong>Experience: </strong><span>{member.experience}</span></p>
          </div>
        </div>
        <div className="faculty-actions">
          <Link className="button button-secondary" href={`/faculty/${member.slug}`}>
            Profile
          </Link>
          <a href={`mailto:${member.email}`} className="button button-primary">
            Email
          </a>
        </div>
      </div>
    </article>
  );
}
