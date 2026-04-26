import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { CmsAdmin } from "@/components/admin/cms-admin";
import { isAuthenticated } from "@/lib/auth";
import { getSiteContent } from "@/lib/cms";

export const metadata = {
  title: "CMS Dashboard | JNTUGV CPSV"
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  noStore();

  if (!(await isAuthenticated())) {
    redirect("/login?next=/admin");
  }

  const content = await getSiteContent();

  return (
    <div className="admin-shell">
       <CmsAdmin initialContent={content} />
    </div>
  );
}
