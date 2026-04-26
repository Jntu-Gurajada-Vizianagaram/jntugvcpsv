import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getAdminCredentialsHint, isAuthenticated } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "CMS Login | JNTUGV CPSV"
};

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin");
  }

  const hint = getAdminCredentialsHint();

  return (
    <main className="login-layout" style={{ background: "var(--bg-soft)" }}>
      <section className="login-card" style={{ maxWidth: "480px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/">
             <Image src="/logo512.png" alt="JNTU-GV" width={64} height={64} />
          </Link>
          <span className="section-tag" style={{ display: "block", marginTop: "1rem" }}>Authorized Access</span>
          <h1 style={{ fontSize: "1.5rem", margin: "0.5rem 0" }}>CMS Portal Login</h1>
          <p className="muted">JNTU-GV College of Pharmaceutical Sciences</p>
        </div>
        
        <LoginForm defaultUsername={hint.username} passwordConfigured={hint.passwordConfigured} />
        
        <div className="login-tip" style={{ marginTop: "2rem" }}>
          <p style={{ fontSize: "0.85rem" }}>
            <strong>Administrator Tip:</strong> Ensure your environment variables are configured correctly for secure access in production.
          </p>
        </div>
        
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
           <Link href="/" className="text-link">← Return to Public Website</Link>
        </div>
      </section>
    </main>
  );
}
