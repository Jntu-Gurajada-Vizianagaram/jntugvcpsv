import { revalidatePath } from "next/cache";
import { getSiteContent, saveSiteContent } from "@/lib/cms";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await getSiteContent();
  return Response.json(content);
}

export async function PUT(request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const savedContent = await saveSiteContent(payload);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/about");
  revalidatePath("/administration");
  revalidatePath("/academics");
  revalidatePath("/admissions");
  revalidatePath("/departments");
  revalidatePath("/facilities");
  revalidatePath("/faculty");
  revalidatePath("/gallery");
  revalidatePath("/mandatory-disclosure");
  revalidatePath("/notices");
  revalidatePath("/student-support");
  revalidatePath("/contact");

  return Response.json({ ok: true, content: savedContent });
}
