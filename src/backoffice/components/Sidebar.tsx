// src/components/Sidebar.tsx
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiFileText, FiLogOut, FiX } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const links = [
    { to: "/admin/properties", label: "Propiedades", icon: <FiHome /> },
    { to: "/admin/blog", label: "Blog", icon: <FiFileText /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo semitransparente */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              background: "#34495e",
              opacity: 0.5,
              zIndex: 10,
            }}
          />

          {/* Sidebar */}
          <motion.aside
            key="sidebar"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              width: "260px",
              background: "#34495e",
              color: "#fff",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 0 12px rgba(0,0,0,0.2)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              padding: "1rem",
              }}
            >
              <h2 style={{ fontWeight: 700, color: "#e67e22" }}>Backoffice</h2>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                }}
              >
                <FiX />
              </button>
            </div>

            {/* Links */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" ,
              padding: "1rem"}}>
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    padding: "0.8rem 1rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: isActive ? "#e67e22" : "#fff",
                    background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                    transition: "all 0.2s ease",
                  })}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Logout */}
            <div style={{
              padding: "1rem",
                display: "flex",
                marginTop: "auto"}}>
            <button
              onClick={handleLogout}
              style={{
                gap: "0.8rem",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                display: "flex",
                alignItems: "center",
                width:'100%',
                textAlign:'left',
                padding: "0.8rem 1rem",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <FiLogOut /> Cerrar sesión
            </button></div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
