// src/components/PropertyCard.tsx
import React, { useState } from "react";
import type { PropertyAdvanced } from "../data/mock-properties-advanced";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

type Props = {
  property: PropertyAdvanced;
  onSelect?: (id: number) => void;
  highlight?: boolean;
};

export const PropertyCard: React.FC<Props> = ({ property, onSelect, highlight }) => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % property.images.length);
  const prev = () => setIndex((i) => (i - 1 + property.images.length) % property.images.length);

  return (
    <article
      style={{
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: highlight ? "0 10px 30px rgba(0,0,0,0.18)" : "0 4px 12px rgba(0,0,0,0.08)",
        border: highlight ? "2px solid #D2691E" : "1px solid rgba(0,0,0,0.06)",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", height: 200, background: "#eee" }}>
        <img
          src={property.images[index]}
          alt={property.titulo}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* thumbnails / nav */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="prev image"
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.35)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="next image"
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.35)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ›
            </button>
          </>
        )}

        {/* badges */}
        <div style={{ position: "absolute", left: 8, top: 8, display: "flex", gap: 8 }}>
          <span style={{ background: "rgba(0,0,0,0.6)", color: "#fff", padding: "4px 8px", borderRadius: 8, fontSize: 12 }}>
            {property.tipo.toUpperCase()}
          </span>
          {property.aceptaCredito && (
            <span style={{ background: "#00c853", color: "#fff", padding: "4px 8px", borderRadius: 8, fontSize: 12 }}>
              <FaCheckCircle /> Crédito
            </span>
          )}
        </div>
      </div>

      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}
      onClick={() => onSelect && onSelect(property.id)}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 16, color: "#2c3e50" }}>{property.titulo}</h3>
          <div style={{ fontWeight: 700, color: "#ffb74d" }}>USD {property.precioUSD.toLocaleString()}</div>
        </div>

        <div style={{ color: "#666", fontSize: 14, display: "flex", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FaMapMarkerAlt /> <span>{property.ubicacion}</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <FaBed /> {property.ambientes}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <FaBath /> {property.banos}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <FaRulerCombined /> {property.metros}m²
            </span>
          </div>
        </div>

        <p style={{ margin: 0, color: "#444", fontSize: 14 }}>{property.descripcion}</p>

        {/* tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {property.tags.map((t) => (
            <span key={t} style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: 8, fontSize: 12 }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
