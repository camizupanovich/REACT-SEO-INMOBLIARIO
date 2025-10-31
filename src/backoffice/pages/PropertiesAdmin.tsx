import React, { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import type { PropertyAdvanced } from "../../data/mock-properties-advanced";

export const PropertiesAdmin: React.FC = () => {
  const [properties, setProperties] = useState<PropertyAdvanced[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(database, "properties");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProperties(formatted);
      } else {
        setProperties([]);
      }
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("¿Seguro que deseas eliminar esta propiedad?")) {
      await remove(ref(database, `properties/${id}`));
    }
  };

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

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {properties.map((p) => (
          <div key={p.id} style={cardStyle}>
            <img
              src={p.images?.[0] || "/placeholder.jpg"}
              alt={p.titulo}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "1rem" }}>
              <h3 style={{ marginBottom: ".5rem", color: "#34495e" }}>{p.titulo}</h3>
              <p style={{ color: "#666", marginBottom: ".5rem" }}>{p.ubicacion}</p>
              <strong style={{ color: "#D2691E" }}>
                USD {p.precioUSD.toLocaleString("es-AR")}
              </strong>

              <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem" }}>
                <button
                  onClick={() => navigate(`/admin/properties/${p.id}`)}
                  style={btnBlue}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(String(p.id))}
                  style={btnDanger}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const btnPrimary: React.CSSProperties = {
  background: "#D2691E",
  color: "#fff",
  border: "none",
  padding: "0.8rem 1.4rem",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
};

const btnBlue: React.CSSProperties = {
  background: "#3498db",
  color: "#fff",
  border: "none",
  padding: ".5rem .8rem",
  borderRadius: 6,
  cursor: "pointer",
};

const btnDanger: React.CSSProperties = {
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  padding: ".5rem .8rem",
  borderRadius: 6,
  cursor: "pointer",
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #eee",
  borderRadius: 12,
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  transition: "transform .2s",
};
