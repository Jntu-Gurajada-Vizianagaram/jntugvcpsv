import Link from "next/link";

export function SiteFooter({ content }) {
  const profile = content?.institutionalProfile;
  const updatedAt = content?.metaData?.lastInstitutionalUpdate;

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>{profile?.parentUniversity}</h2>
            <p className="footer-brand-subtitle">College of Pharmaceutical Sciences, Vizianagaram</p>
            <p className="footer-contact">
              {profile?.location}<br />
              <strong>Administrative:</strong> {profile?.phone}<br />
              <strong>Correspondence:</strong> {profile?.email}
            </p>
          </div>
          <div className="footer-links-grid">
            <div className="footer-link-group">
              <h3>Institutional Links</h3>
              <ul className="footer-link-list">
                <li><Link href="/about">Institutional Profile</Link></li>
                <li><Link href="/academics">Academic Framework</Link></li>
                <li><Link href="/faculty">Faculty Repository</Link></li>
                <li><Link href="/gallery">Campus Archive</Link></li>
              </ul>
            </div>
            <div className="footer-link-group">
              <h3>Public Domain</h3>
              <ul className="footer-link-list">
                <li><Link href="/mandatory-disclosure">Statutory Disclosures</Link></li>
                <li><Link href="/admissions">Admissions Portfolio</Link></li>
                <li><Link href="/contact">Connect With Us</Link></li>
                <li><Link href="/login">Governance Portal</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} JNTU-GV College of Pharmaceutical Sciences. All Rights Reserved.</p>
          <p>
            Portal Last Synchronized: {updatedAt ? new Date(updatedAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'long', year: 'numeric' }) : "2025"}
          </p>
        </div>
      </div>
    </footer>
  );
}
