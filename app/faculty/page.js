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
      <ContentLayout
        sidebar={
          <div className="stacked-sections">
            <div className="sidebar-card card-institutional" style={{ padding: '1.5rem' }}>
              <h3 className="section-tag" style={{ width: '100%' }}>Principal</h3>
              <div style={{ marginTop: "1rem" }}>
                <div style={{ width: "100%", aspectRatio: "1/1", background: "var(--bg-soft)", borderRadius: "12px", marginBottom: "1rem", overflow: "hidden" }}>
                  <Image src={principal.image} alt={principal.name} width={300} height={300} style={{ objectFit: "cover" }} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{principal.name}</h3>
                <p className="muted" style={{ fontSize: "0.85rem" }}>{principal.designation}</p>
                <Link href="/principal" className="button button-primary" style={{ width: "100%", marginTop: "1rem", fontSize: "0.85rem" }}>
                  View Principal's Profile
                </Link>
              </div>
            </div>
            <div className="sidebar-card card-institutional" style={{ padding: '1.5rem' }}>
              <h3 className="section-tag" style={{ width: '100%' }}>Resources</h3>
              <ul className="link-list" style={{ listStyle: 'none', padding: 0, marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
                {scholarlyDownloads.slice(0, 5).map((item) => (
                  <li key={item.title}>
                    <a href={item.file} target="_blank" rel="noreferrer" style={{ fontWeight: "600", color: "var(--primary)", fontSize: '0.9rem' }}>
                      • {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      >
        <section className="portal-main">
          {/* Teaching Staff Section */}
          <div className="portal-board">
            <div className="portal-board-head">
              <h2>Teaching Staff</h2>
            </div>

            <div className="faculty-grid">
              {teachingStaff.map((member) => (
                <FacultyMemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          {/* Administration Section */}
          {adminStaff.length > 0 && (
            <div className="portal-board" style={{ marginTop: "3rem" }}>
              <div className="portal-board-head">
                <h2>Administrative Staff</h2>
              </div>

              <div className="faculty-grid">
                {adminStaff.map((member) => (
                  <FacultyMemberCard key={member.name} member={member} />
                ))}
              </div>
            </div>
          )}

          <article className="content-card-block card-institutional" style={{ textAlign: "center", padding: "4rem", marginTop: '4rem' }}>
            <span className="section-tag">Our Commitment</span>
            <h2 style={{ fontSize: '2rem', marginTop: '1rem' }}>Academic Excellence</h2>
            <p style={{ maxWidth: "600px", margin: "1.5rem auto" }}>
              Our faculty uphold the highest standards of research ethics and quality teaching, in accordance with the guidelines of JNTU-GV and the Pharmacy Council of India.
            </p>
            <Link href="/mandatory-disclosure" className="text-link">View Mandatory Disclosure →</Link>
          </article>
        </section>
      </ContentLayout>
    </SiteShell>
  );
}

function FacultyMemberCard({ member }) {
  return (
    <article className="faculty-card card-institutional">
      <div className="faculty-photo" style={{ height: '300px' }}>
        <Image
          src={member.image || "/placeholder-faculty.jpg"}
          alt={member.name}
          width={320}
          height={400}
          style={{ objectFit: "cover", objectPosition: "center top", width: '100%', height: '100%' }}
        />
      </div>
      <div className="faculty-body">
        <div>
          <span className="notice-pill" style={{ background: 'rgba(212,175,55,0.12)', color: 'var(--gold)', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em' }}>{member.designation}</span>
          <h3 style={{ fontSize: "1.3rem", margin: "0.75rem 0 0.25rem", fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--navy)' }}>{member.name}</h3>
          <p style={{ color: "var(--primary)", fontWeight: "700", fontSize: "0.8rem", textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 1rem' }}>{member.department}</p>

          <div style={{ fontSize: "0.85rem", borderTop: '1px solid var(--border)', paddingTop: '0.9rem', marginTop: '0.5rem' }}>
            <p style={{ margin: 0 }}><strong style={{ color: 'var(--navy)', fontWeight: 700 }}>Experience: </strong><span style={{ color: 'var(--muted)' }}>{member.experience}</span></p>
          </div>
        </div>

        <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
          <Link className="button button-secondary" style={{ flex: 1, fontSize: "0.78rem", padding: "0.6rem 1rem", textAlign: 'center' }} href={`/faculty/${member.slug}`}>
            View Profile
          </Link>
          <a href={`mailto:${member.email}`} className="button button-primary" style={{ flex: 1, fontSize: "0.78rem", padding: "0.6rem 1rem", textAlign: 'center' }}>
            Email
          </a>
        </div>
      </div>
    </article>
  );
}
