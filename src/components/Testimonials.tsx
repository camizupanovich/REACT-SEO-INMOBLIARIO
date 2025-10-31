import { useState, useEffect} from "react";

type Testimonial = {
  name: string;
  role: string;
  comment: string;
};

const testimonials: Testimonial[] = [
  {
    name: "María Fernández",
    role: "Compradora satisfecha",
    comment: "Encontré la casa de mis sueños en tiempo récord, gracias al equipo profesional y cercano.",
  },
  {
    name: "Javier Gómez",
    role: "Inversionista",
    comment: "Transparencia y asesoría de alto nivel. Invertir aquí fue sencillo y seguro.",
  },
  {
    name: "Laura Pérez",
    role: "Vendedora",
    comment: "Vender mi propiedad fue fácil y confiable gracias al acompañamiento constante.",
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const primaryColor = "#34495e";

  // Cambio de testimonios cada 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        padding: "6rem 2rem 6rem 2rem",
        backgroundColor: "#fff",
        textAlign: "center",
        overflow: "hidden",
      }}
    > <h2 style={{ fontSize: "2.5rem", color: "#34495e", fontWeight: 700, marginBottom: "3rem" }}>
        Lo que dicen nuestros clientes
      </h2>

      <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
        {testimonials.map((t, index) => (
          <div
            key={index}
            style={{
              position: index === current ? "relative" : "absolute",
              top: 0,
              left: 0,
              opacity: index === current ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              zIndex: 1,
              maxWidth:'90vw'
            }}
          >
            <p style={{ fontSize: "1.2rem", color: "#34495e", marginBottom: "1rem", lineHeight: 1.6 }}>
              "{t.comment}"
            </p>
            <p style={{ fontWeight: 600, color: "#D2691E", marginBottom: "0.25rem" }}>{t.name}</p>
            <p style={{ color: "#34495e", fontStyle: "italic", margin: 0 }}>{t.role}</p>
          </div>
        ))}
      </div> 
    </section>
  );
};
