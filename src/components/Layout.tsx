import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = () => (
  <>
    <Header />
    <main style={{ minHeight: "80vh" }}>
      <Outlet />
    </main>
    <Footer />
  </>
);
