import { Helmet } from "react-helmet";
import { mockBlog } from "../data/mock-blog";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const Blog = () => {
  const [search, setSearch] = useState("");

  const filteredPosts = mockBlog.filter((post) => {
    const term = search.toLowerCase();
    return (
      post.titulo.toLowerCase().includes(term) ||
      post.descripcion.toLowerCase().includes(term) ||
      post.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  });

  return (
    <div style={{padding:'2rem'}}>
      <Helmet>
        <title>Blog | React SEO Blog</title>
        <meta
          name="description"
          content="Artículos recientes sobre desarrollo y tecnología."
        />
      </Helmet>

<div style={{justifyContent:'space-around',alignItems:'center',display:'flex'}}>
    <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#34495e" }}>
        Blog Inmobiliario: Guías, Tips y Tendencias
      </h1>

      {/* Buscador */}
      <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
          <FaSearch
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#888",
            }}
          />
          <input
            type="text"
            placeholder="Buscar por título, descripción o tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 1rem 0.5rem 2.5rem", // espacio para el icono
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div></div>
      

      {/* Grid de posts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
              className="blog-card"
            >
              <div
                style={{
                  backgroundImage: `url(${post.imagen})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "180px",
                  width: "100%",
                }}
              />
              <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: ".9rem", color: "#888", marginBottom: ".5rem" }}>
                  {post.fecha}
                </p>
                <h2 style={{ fontSize: "1.3rem", margin: "0 0 .5rem 0", color: "#34495e" }}>
                  {post.titulo}
                </h2>
                <p style={{ flex: 1, marginBottom: "1rem" }}>
                  {post.descripcion}
                </p>
                <p style={{ marginBottom: "1rem", fontSize: ".9rem" }}>
                  <strong>Tags:</strong> {post.tags.join(", ")}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  style={{
                    alignSelf: "flex-start",
                    textDecoration: "none",
                    color: "#D2691E",
                    fontWeight: 600,
                    transition: "color 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#e66b13ff")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#D2691E")}
                >
                  Leer más
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#888" }}>
            No se encontraron resultados para "{search}"
          </p>
        )}
      </div>

      {/* --- CSS Hover --- */}
      <style>
        {`
          .blog-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
};
