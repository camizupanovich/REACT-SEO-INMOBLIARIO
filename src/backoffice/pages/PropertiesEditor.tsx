import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "../firebase";
import { PropertyForm } from "../components/PropertyForm";
import type { PropertyAdvanced } from "../../data/mock-properties-advanced";

export const PropertyEditor: React.FC = () => {
  const [property, setProperty] = useState<PropertyAdvanced | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const snapshot = await get(ref(database, `properties/${id}`));
      if (snapshot.exists()) {
        setProperty({ id, ...snapshot.val() });
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <nav style={{ marginBottom: "1.5rem", color: "#777" }}>
        <Link to="/admin/properties" style={{ color: "#D2691E", textDecoration: "none" }}>
          Propiedades
        </Link>{" "}
        / {id ? "Editar Propiedad" : "Nueva Propiedad"}
      </nav>

      <PropertyForm
      />
    </div>
  );
};
