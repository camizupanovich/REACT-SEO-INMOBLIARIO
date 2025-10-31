import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { mockBlog } from "../data/mock-blog";

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = mockBlog.find(p => p.slug === slug);

  if (!post) return <p>Artículo no encontrado.</p>;

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{post.titulo} | Inmobiliaria Blog</title>
        <meta name="description" content={post.descripcion} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta property="og:title" content={post.titulo} />
        <meta property="og:description" content={post.descripcion} />
        <meta property="og:image" content={post.imagen} />
      </Helmet>

      <article
        style={{
          maxWidth: "900px",
          margin: "3rem auto",
          padding: "0 1rem",
          fontFamily: "'Inter', sans-serif",
          color: "#34495e",
        }}
      >
        {/* Imagen destacada */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <img
            src={post.imagen}
            alt={post.titulo}
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </div>

        {/* Título y fecha */}
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "0.5rem",
            fontWeight: 700,
            lineHeight: 1.2,
            color:'#6B8E23'
          }}
        >
          {post.titulo}
        </h1>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#777",
            marginBottom: "1.5rem",
          }}
        >
          Publicado el {post.fecha}
        </p>

        {/* Extracto */}
        <p
          style={{
            fontSize: "1.1rem",
            fontWeight: 500,
            marginBottom: "1.5rem",
            lineHeight: 1.5,
          }}
        >
          {post.descripcion}
        </p>

        {/* Contenido principal */}
        <section>
          {post.longDescription.split("\n").map((paragraph, idx) => (
            <p
              key={idx}
              style={{
                marginBottom: "1rem",
                fontSize: "1rem",
                lineHeight: 1.6,
              }}
            >
              {paragraph}
            </p>
          ))}
        </section>

        {/* Tags */}
        <section style={{ marginTop: "2rem" }}>
          <h3 style={{ marginBottom: "0.8rem", fontSize: "1.1rem" }}>Etiquetas:</h3>
          <ul
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              padding: 0,
              listStyle: "none",
            }}
          >
            {post.tags.map(tag => (
              <li
                key={tag}
                style={{
                  backgroundColor: "#6B8E23",
                  color: "#fff",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>
      </article>

      {/* Responsive adjustments */}
      <style>
        {`
          @media (max-width: 768px) {
            h1 { font-size: 1.7rem; }
            p { font-size: 1rem; line-height: 1.5; }
            img { max-height: 300px; }
          }

          @media (max-width: 480px) {
            h1 { font-size: 1.5rem; }
            p { font-size: 0.95rem; line-height: 1.4; }
            img { max-height: 250px; }
          }
        `}
      </style>
    </>
  );
};
