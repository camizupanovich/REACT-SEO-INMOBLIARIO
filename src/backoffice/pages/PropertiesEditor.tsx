import React from "react";
import { useParams, Link } from "react-router-dom";
import { PropertyForm } from "../components/PropertyForm";
export const PropertyEditor: React.FC = () => {
  const { id } = useParams();
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
