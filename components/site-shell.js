import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function SiteShell({ content, children }) {
  return (
    <div className="viewport-app">
      <SiteHeader />
      {children}
      <SiteFooter content={content} />
    </div>
  );
}
