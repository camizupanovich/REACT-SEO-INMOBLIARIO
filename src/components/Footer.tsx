import React, { useRef, useEffect } from "react";

const primaryColor = "#F5F5DC"; // Color institucional

// Función que genera la path de la wave
const generateWavePath = (
  phase: number,
  amplitude1: number,
  amplitude2: number,
  wavelength: number,
  height: number,
  width: number
) => {
  const points = 200;
  let path = `M0,${height} `;
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * width;
    const y =
      height +
      Math.sin((i / points) * wavelength + phase) * amplitude1 +
      Math.sin((i / points) * wavelength * 1.5 + phase / 2) * amplitude2;
    path += `L${x},${y} `;
  }
  path += `L${width},${height * 2} L0,${height * 2} Z`;
  return path;
};

export const Footer = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      phaseRef.current += 0.01; // velocidad muy suave
      if (pathRef.current) {
        pathRef.current.setAttribute(
          "d",
          generateWavePath(phaseRef.current, 20, 10, 4 * Math.PI, 60, 1440)
        );
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <footer
      style={{
        position: "relative",
        backgroundColor: "#f7f8fa",
        overflow: "hidden",
        paddingTop: "6rem", // suficiente para que la wave quede detrás
      }}
    >
      {/* Wave animada */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100px",
          zIndex: 0,
        }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path ref={pathRef} fill={primaryColor} d="" />
      </svg>

      {/* Contenido */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor:primaryColor,
          height:"100%",
        paddingBottom: "4rem",
        }}
      >
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
          color: "#34495e",
        }}>
        {/* Menú */}
        <div style={{ flex: "1 1 200px", marginBottom: "1rem" }}>
          <h4 style={{ marginBottom: "1rem" }}>Menú</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <a href="/faq" style={{ textDecoration: "none", color: "#D2691E" }}>
                Preguntas frecuentes
              </a>
            </li>
            <li>
              <a href="/blog" style={{ textDecoration: "none", color: "#D2691E" }}>
                Blog
              </a>
            </li>
            <li>
              <a href="/agents" style={{ textDecoration: "none", color: "#D2691E" }}>
                Agentes
              </a>
            </li>
            <li>
              <a href="/propiedades" style={{ textDecoration: "none", color: "#D2691E" }}>
                Propiedades
              </a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div style={{ flex: "1 1 200px", marginBottom: "1rem" }}>
          <h4 style={{ marginBottom: "1rem" }}>Contacto</h4>
          <p>Oficina central: Calle Falsa 123, Ciudad</p>
          <p>Email: info@midominio.com</p>
          <p>Teléfono: +54 9 11 1234-5678</p>
        </div>

        {/* Redes sociales */}
        <div style={{ flex: "1 1 200px", marginBottom: "1rem" }}>
          <h4 style={{ marginBottom: "1rem" }}>Síguenos</h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              gap: "1rem",
            }}
          >
            <li>
              <a href="https://instagram.com" style={{ color: "#D2691E" }}>
                Instagram
              </a>
            </li>
            <li>
              <a href="https://facebook.com" style={{ color: "#D2691E" }}>
                Facebook
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" style={{ color: "#D2691E" }}>
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copy institucional */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          color: "#34495e",
          marginTop: "2rem",
        }}
      >
        © 2025 Nombre de la Empresa – Todos los derechos reservados
      </div></div>
    </footer>
  );
};
