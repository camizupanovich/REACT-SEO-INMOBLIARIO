import { mockBlog } from "../data/mock-blog";
import { Link } from "react-router-dom";

export const BlogPreviewGrid = () => (
  <section style={{ padding: "4rem 2rem", backgroundColor: "#f9f9f9" }}>
    <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "3rem", color: "#34495e" }}>
      Últimas publicaciones
    </h2>

    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      }}
    >
      {mockBlog.slice(0, 3).map((post) => (
        <article
          key={post.id}
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <img
            src={post.imagen}
            alt={post.titulo}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />

          <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem", color: "#34495e" }}>
              {post.titulo}
            </h3>
            <p style={{ flex: 1, color: "#34495e", lineHeight: 1.6, marginBottom: "1rem" }}>
              {post.descripcion}
            </p>
            <Link
              to={`/blog/${post.slug}`}
              style={{
                alignSelf: "flex-start",
                textDecoration: "none",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                backgroundColor: "#D2691E",
                color: "#fff",
                fontWeight: 600,
                transition: "background-color 0.3s ease",
              }}
            >
              Leer más
            </Link>
          </div>
        </article>
      ))}
    </div>
  </section>
);

