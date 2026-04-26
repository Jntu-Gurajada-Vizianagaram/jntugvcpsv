export function ContentLayout({ sidebar, children }) {
  return (
    <section className="section">
      <div className="shell route-layout">
        <div className="route-main">{children}</div>
        <aside className="route-sidebar">{sidebar}</aside>
      </div>
    </section>
  );
}
