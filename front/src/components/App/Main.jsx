import "./Main.css";

export default function Main({ children, menu = null, sidebar = null }) {
  return (
    <main className="main-layout">
      {menu ? <aside className="main-layout__menu">{menu}</aside> : null}
      <section className="main-layout__content">{children}</section>
      {sidebar ? <aside className="main-layout__sidebar">{sidebar}</aside> : null}
    </main>
  );
}
