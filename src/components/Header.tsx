import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHome } from "react-icons/fa";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Detecta si estamos en Home
    setIsTransparent(location.pathname === "/");

    // Si estamos en Home, escucha el scroll para manejar transparencia dinámica
    const handleScroll = () => {
      if (location.pathname === "/") {
        setIsTransparent(window.scrollY < 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const navItems = [
    { label: "Propiedades", path: "/propiedades" },
    { label: "Blog", path: "/blog" },
    { label: "FAQ", path: "/faq" },
    { label: "Contacto", path: "/contacto" },
  ];

  return (
    <header
      style={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        transition: "background 0.3s ease, color 0.3s ease",
        background: isTransparent ? "transparent" : "#F5F5DC",
        boxShadow: isTransparent ? "none" : "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: isTransparent ? "#F5F5DC" : "#D2691E",
            fontWeight: 700,
            fontSize: "1.3rem",
            transition: "color 0.3s ease",
          }}
        >
          <FaHome />
          Zupanovich Propiedades
        </Link>

        {/* NAV DESKTOP */}
        <nav
          className="nav-desktop"
          style={{
            display: "flex",
            gap: "2rem",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: "none",
                color:
                  location.pathname === item.path
                    ? "#D2691E"
                    : isTransparent
                    ? "#F5F5DC"
                    : "#34495e",
                fontWeight:
                  location.pathname === item.path ? 600 : 500,
                borderBottom:
                  location.pathname === item.path
                    ? "2px solid #D2691E"
                    : "2px solid transparent",
                transition: "all 0.3s ease",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* MENU HAMBURGUESA MOBILE */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(true)}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "1.7rem",
            color: isTransparent ? "#F5F5DC" : "#D2691E",
            cursor: "pointer",
            display: "none",
            transition: "color 0.3s ease",
          }}
        >
          <FaBars />
        </button>
      </div>

      {/* SIDEBAR ANIMADO */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Fondo difuminado */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.4)",
                zIndex: 998,
              }}
            />

            {/* Sidebar */}
            <motion.div
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                width: "280px",
                background: "#2c3e50",
                color: "#F5F5DC",
                boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
                zIndex: 999,
                display: "flex",
                flexDirection: "column",
                padding: "1.5rem",
                gap: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  Navegación
                </h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "1.5rem",
                    color: "#F5F5DC",
                    cursor: "pointer",
                  }}
                >
                  <FaTimes />
                </button>
              </div>

              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      color: "#F5F5DC",
                      fontWeight:
                        location.pathname === item.path ? 700 : 500,
                      padding: "0.6rem 0",
                      borderBottom:
                        location.pathname === item.path
                          ? "2px solid #ffd54f"
                          : "2px solid transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  marginTop: "auto",
                  textAlign: "center",
                  fontSize: "0.85rem",
                  opacity: 0.8,
                }}
              >
                © 2025 Zupanovich Propiedades
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ESTILOS RESPONSIVE */}
      <style>{`
        @media (max-width: 900px) {
          .nav-desktop {
            display: none !important;
          }
          .menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
