// src/components/BackofficeLayout.tsx
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";

export const BackofficeLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f8fa" }}>
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Contenido principal */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1rem",
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="menu-button"
            style={{
              background: "none",
              border: "none",
              color: "#34495e",
              fontSize: "1.6rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FiMenu />
          </button>
          <h1 style={{ fontSize: "1.1rem", color: "#34495e", fontWeight: 700 }}>
            Panel de Administración
          </h1>
        </header>

        {/* Main content */}
        <motion.main
          style={{
            flex: 1,
            marginTop: "60px",
            padding: "2rem",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};
