import React, { useState, useLayoutEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const imageUrl = "/hero.jpg";

export const Hero: React.FC = () => {
  const [textColor, setTextColor] = useState<string>("white");
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
const navigate = useNavigate();
  useLayoutEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "anonymous";
    img.onload = () => setTextColor("white");
  }, []);

  const [filters, setFilters] = useState({
    operacion: "",
    ubicacion: "",
    ambientes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando con filtros:", filters);
    // construimos los query params
    const params = new URLSearchParams(
      Object.entries(filters).filter(([_, v]) => v !== "")
    ).toString();

    // redirigimos a /propiedades con los query params
    navigate(`/propiedades?${params}`);
  };

  const isMobile = windowWidth < 700;

  const heroStyle: React.CSSProperties = {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: textColor,
    padding: "2rem 1rem",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background: "rgba(52, 73, 94, 0.7)", // 🔹 sin blur
    zIndex: 1,
  };

  const contentStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 2,
    maxWidth: "90vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const formContainerStyle: React.CSSProperties = {
    marginTop: "3.5rem",
    padding: "1.7rem",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0)", // 🔹 transparente
    backdropFilter: "blur(5px)", // 🔹 blur solo en el filtro
    WebkitBackdropFilter: "blur(5px)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "800px",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: isMobile ? "wrap" : "nowrap",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  };

  const selectStyle: React.CSSProperties = {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    flex: "1",
    minWidth: "200px",
    boxSizing: "border-box",
  };

  const inputStyle: React.CSSProperties = {
    ...selectStyle,
  };

  const buttonStyle: React.CSSProperties = {
    background: "#D2691E",
    color: "#fff",
    border: "none",
    padding: isMobile ? "0.75rem 1.25rem" : "0.75rem",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? "0.5rem" : "0",
    minWidth: isMobile ? "120px" : "50px",
  };

  return (
    <section style={heroStyle}>
      <div style={overlayStyle}></div>

      <div style={contentStyle}>
        <h1
          style={{
            fontSize:
              windowWidth < 480 ? "1.5rem" : windowWidth < 768 ? "2rem" : "2.5rem",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
        >
          Encontrá la casa de tus sueños hoy
        </h1>

        <p
          style={{
            fontSize:
              windowWidth < 480 ? "0.95rem" : windowWidth < 768 ? "1rem" : "1.125rem",
            lineHeight: 1.2,
            maxWidth: "700px",
            marginBottom: "3rem",
          }}
        >
          Te ayudamos a descubrir propiedades únicas, con confianza y seguridad
          para que tu próxima inversión sea perfecta.
        </p>

        {/* 🔹 Contenedor con blur */}
        <div style={formContainerStyle}>
          <form onSubmit={handleSearch} style={formStyle}>
            <select
              name="operacion"
              value={filters.operacion}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="">Tipo de operación</option>
              <option value="compra">Compra</option>
              <option value="venta">Venta</option>
              <option value="inversion">Inversión</option>
            </select>

            <input
              type="text"
              name="ubicacion"
              placeholder="Ubicación (ej: Palermo, Córdoba...)"
              value={filters.ubicacion}
              onChange={handleChange}
              style={inputStyle}
            />

            <select
              name="ambientes"
              value={filters.ambientes}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="">Ambientes</option>
              <option value="1">1 ambiente</option>
              <option value="2">2 ambientes</option>
              <option value="3">3 ambientes</option>
              <option value="4+">4+ ambientes</option>
            </select>

            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.background = "#f36f10ff")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#D2691E")}
            >
              <FiSearch />
              {isMobile && <span>Buscar</span>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

