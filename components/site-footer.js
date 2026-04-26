import Link from "next/link";

export function SiteFooter({ content }) {
  const profile = content?.institutionalProfile;
  const updatedAt = content?.metaData?.lastInstitutionalUpdate;

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <h2 style={{ color: "white", marginBottom: "1rem", fontFamily: 'var(--font-serif)' }}>{profile?.parentUniversity}</h2>
            <p style={{ fontWeight: "700", color: "var(--accent)", fontSize: '1.1rem' }}>College of Pharmaceutical Sciences, Vizianagaram</p>
            <p style={{ marginTop: "1.5rem", opacity: 0.8, fontSize: '0.9rem' }}>
              {profile?.location}<br />
              Administrative: {profile?.phone}<br />
              Correspondence: {profile?.email}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div>
              <h3 style={{ color: "white", fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Institutional Links</h3>
              <ul style={{ listStyle: "none", padding: 0, opacity: 0.8, display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
                <li><Link href="/about">Institutional Profile</Link></li>
                <li><Link href="/academics">Academic Framework</Link></li>
                <li><Link href="/faculty">Faculty Repository</Link></li>
                <li><Link href="/gallery">Campus Archive</Link></li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: "white", fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Public Domain</h3>
              <ul style={{ listStyle: "none", padding: 0, opacity: 0.8, display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
                <li><Link href="/mandatory-disclosure">Statutory Disclosures</Link></li>
                <li><Link href="/admissions">Admissions Portfolio</Link></li>
                <li><Link href="/contact">Connect With Us</Link></li>
                <li><Link href="/login">Governance Portal</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", opacity: 0.5 }}>
          <p>© {new Date().getFullYear()} JNTU-GV College of Pharmaceutical Sciences. All Rights Reserved.</p>
          <p>
            Portal Last Synchronized: {updatedAt ? new Date(updatedAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'long', year: 'numeric' }) : "2025"}
          </p>
        </div>
      </div>
    </footer>
  );
}
