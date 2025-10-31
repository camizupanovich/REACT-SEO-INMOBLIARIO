import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { PropertiesPage } from "./pages/PropertiesPage";
import { PropertyDetail } from "./components/ProperyDetail";
import { Contact } from "./components/Contact";
import { FAQPage } from "./pages/Faq";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./backoffice/firebase";
import type { JSX } from "react";
import { LoginPage } from "./pages/Login";
import { Admin } from "./backoffice/App";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Cargando...</p>;
  return user ? children : <Navigate to="/login" replace />;
};

export const App = () => (
  <Routes>
    {/* Rutas públicas */}
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="contacto" element={<Contact />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog/:slug" element={<BlogPost />} />
      <Route path="/propiedades" element={<PropertiesPage />} />
      <Route path="/propiedad/:slug" element={<PropertyDetail />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Route>

    {/* Rutas privadas */}
    <Route
      path="/admin/*"
      element={
        <PrivateRoute>
          <Admin />
        </PrivateRoute>
      }
    />
  </Routes>
);
