import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref as dbRef, get, remove } from "firebase/database";
import { database } from "../firebase";

type PropertyAdvanced = {
  id: number;
  titulo: string;
  tipo: string;
  operacion: string;
  ubicacion: string;
  coords: { lat: number; lng: number };
  precioUSD: number;
  ambientes: number;
  banos: number;
  metros: number;
  fechaPublicacion: string;
  tags: string[];
  images?: string[];
  aceptaCredito: boolean;
  descripcion: string;
  longDescription: string;
};

export const PropertiesAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<(PropertyAdvanced & { firebaseKey: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [error, setError] = useState<string | null>(null);

  // Estilos inline simples
  const cardStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    borderRadius: 8,
    overflow: "hidden",
    width: 280,
    margin: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };
  const btnBlue: React.CSSProperties = {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: 4,
    cursor: "pointer",
  };
  const btnDanger: React.CSSProperties = {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: 4,
    cursor: "pointer",
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchProperties = async () => {
      try {
        const snap = await get(dbRef(database, "properties"));
        if (!snap.exists()) {
          setProperties([]);
          setLoading(false);
          return;
        }

        // Transformar objeto de Firebase a array con firebaseKey
        const data = snap.val();
        const arr = Object.entries(data).map(([firebaseKey, prop]: [string, any]) => ({
          firebaseKey,
          ...prop,
        }));
        setProperties(arr);
      } catch (err) {
        console.error(err);
        setError("Error cargando propiedades.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (firebaseKey: string) => {
    if (!window.confirm("¿Estás seguro de eliminar esta propiedad?")) return;

    try {
      await remove(dbRef(database, `properties/${firebaseKey}`));
      setProperties((prev) => prev.filter((p) => p.firebaseKey !== firebaseKey));
    } catch (err) {
      console.error(err);
      setError("Error eliminando la propiedad.");
    }
  };

  if (loading) return <div>Cargando propiedades...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
  <div style={{ padding: "2rem", maxWidth: 1200, margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", color: "#34495e" }}>
          🏡 Administración de Propiedades
        </h1>
        <button
          onClick={() => navigate("/admin/properties/new")}
          style={btnPrimary}
        >
          + Nueva Propiedad
        </button>
      </header>
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
          style={{ marginBottom: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Cambiar a vista {viewType === "grid" ? "lista" : "grid"}
        </button>
      </div>

      {viewType === "grid" ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {properties.map((p) => (
            <div key={p.firebaseKey} style={cardStyle}>
              <img
                src={p.images?.[0] || "/placeholder.jpg"}
                alt={p.titulo}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
              <div style={{ padding: "1rem" }}>
                <h3 style={{ marginBottom: ".5rem", color: "#34495e" }}>{p.titulo}</h3>
                <p style={{ color: "#666", marginBottom: ".5rem" }}>{p.ubicacion}</p>
                <strong style={{ color: "#D2691E" }}>
                  USD {p.precioUSD.toLocaleString("es-AR")}
                </strong>

                <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem" }}>
                  <button
                    onClick={() => navigate(`/admin/properties/${p.firebaseKey}`)}
                    style={btnBlue}
                  >
                    Editar
                  </button>
                  <button onClick={() => handleDelete(p.firebaseKey)} style={btnDanger}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Imagen</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Título</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Ubicación</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Precio USD</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.firebaseKey}>
                <td style={{ padding: "0.5rem" }}>
                  <img
                    src={p.images?.[0] || "/placeholder.jpg"}
                    alt={p.titulo}
                    style={{ width: 100, height: 60, objectFit: "cover", borderRadius: 4 }}
                  />
                </td>
                <td style={{ padding: "0.5rem" }}>{p.titulo}</td>
                <td style={{ padding: "0.5rem" }}>{p.ubicacion}</td>
                <td style={{ padding: "0.5rem" }}>{p.precioUSD.toLocaleString("es-AR")}</td>
                <td style={{ padding: "0.5rem", display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => navigate(`/admin/properties/${p.firebaseKey}`)}
                    style={btnBlue}
                  >
                    Editar
                  </button>
                  <button onClick={() => handleDelete(p.firebaseKey)} style={btnDanger}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PropertiesAdmin;
const btnPrimary: React.CSSProperties = {
  background: "#D2691E",
  color: "#fff",
  border: "none",
  padding: "0.8rem 1.4rem",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
};