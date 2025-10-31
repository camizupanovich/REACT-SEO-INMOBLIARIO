import React, { useEffect, useRef, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import { Helmet } from "react-helmet";
import { mockPropertiesAdvanced, type PropertyAdvanced } from "../data/mock-properties-advanced";
import { FaBath, FaBed, FaMapMarkerAlt, FaRulerCombined, FaTag } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { slugify } from "../utils/slugify";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface Props {
  property?: PropertyAdvanced; // opcional si se usa dentro de modal
  inModal?: boolean;
  onClose?: () => void;
}

export const PropertyDetail: React.FC<Props> = ({ property, inModal = false, onClose }) => {
  const { slug } = useParams<{ slug: string }>();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // ✅ Determinar qué propiedad mostrar
  const activeProperty = useMemo(() => {
    if (property) return property;
    if (slug) {
      return mockPropertiesAdvanced.find((p) => slugify(p.titulo) === slug);
    }
    return null;
  }, [property, slug]);

  // Si no se encontró la propiedad, mostrar 404
  if (!activeProperty) {
    return (
      <div style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h2>Propiedad no encontrada</h2>
        <p>Verificá el enlace o regresá al listado de propiedades.</p>
      </div>
    );
  }

  // Inicializa el mapa
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    const { coords, ubicacion } = activeProperty;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [coords.lng, coords.lat],
      zoom: 14,
    });

    new mapboxgl.Marker({ color: "#D2691E" })
      .setLngLat([coords.lng, coords.lat])
      .setPopup(new mapboxgl.Popup().setText(ubicacion))
      .addTo(mapRef.current);

    return () => mapRef.current?.remove();
  }, [activeProperty]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: inModal ? "1fr" : "1fr 400px",
        gap: 24,
        padding: inModal ? 0 : "32px 16px",
        background: "#fff",
        borderRadius: inModal ? 0 : 12,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* SEO solo si es página completa */}
      {!inModal && (
        <Helmet>
          <title>
            {`${activeProperty.titulo} - ${activeProperty.operacion} en ${activeProperty.ubicacion}`}
          </title>
          <meta
            name="description"
            content={`${activeProperty.descripcion.slice(0, 150)}...`}
          />
          <meta property="og:title" content={`${activeProperty.titulo} | ${activeProperty.operacion.toUpperCase()}`} />
          <meta property="og:description" content={activeProperty.descripcion} />
          <meta property="og:type" content="article" />
          <meta property="og:image" content={activeProperty.images[0]} />
        </Helmet>
      )}

      {/* Contenido principal */}
      <div style={{ display: "grid", gap: 16 }}>
        {inModal && (
          <button
            onClick={onClose}
            style={{
              alignSelf: "start",
              justifySelf: "end",
              background: "transparent",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        )}

        {/* Galería */}
        <div style={{ display: "flex", overflowX: "auto", gap: 8, borderRadius: 8 }}>
          {activeProperty.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${activeProperty.titulo}-${i}`}
              style={{
                width: "100%",
                maxWidth: 400,
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
          ))}
        </div>

        {/* Título */}
        <div>
          <h1 style={{ marginBottom: 8 }}>{activeProperty.titulo}</h1>
          <div style={{ color: "#777" }}>
            <FaMapMarkerAlt /> {activeProperty.ubicacion}
          </div>
        </div>

        {/* Info */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 14,
            color: "#444",
          }}
        >
          <div><FaBed /> {activeProperty.ambientes} ambientes</div>
          <div><FaBath /> {activeProperty.banos} baños</div>
          <div><FaRulerCombined /> {activeProperty.metros} m²</div>
          <div><FaTag /> {activeProperty.tipo}</div>
        </div>

        {/* Precio */}
        <div style={{ fontSize: 28, fontWeight: "bold", color: "#D2691E" }}>
          USD {activeProperty.precioUSD.toLocaleString()}
        </div>

        {/* Descripción */}
        <p style={{ lineHeight: 1.6, color: "#333" }}>{activeProperty.descripcion}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {activeProperty.tags?.map((t) => (
            <span
              key={t}
              style={{
                background: "#D2691E",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: 16,
                fontSize: 13,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Mapa */}
        <div
          ref={mapContainer}
          style={{
            width: "100%",
            height: 300,
            borderRadius: 8,
            overflow: "hidden",
          }}
        />

        {/* Contacto */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <a
            href={`https://wa.me/5491122334455?text=Hola, estoy interesado en la propiedad ${activeProperty.titulo}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#25D366",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Contactar por WhatsApp
          </a>
          <button
            onClick={() => alert("Favorito guardado")}
            style={{
              background: "#f5f5f5",
              border: "1px solid #ccc",
              padding: "10px 16px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            ❤️ Guardar favorito
          </button>
        </div>
      </div>

      {/* Aside (solo si no está en modal) */}
      {!inModal && (
        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            padding: 16,
            border: "1px solid #eee",
            borderRadius: 8,
            background: "#fafafa",
            height: "fit-content",
          }}
        >
          <h3>Información de contacto</h3>
          <p><strong>Inmobiliaria:</strong> Propiedades Zupanovich</p>
          <p><strong>Teléfono:</strong> 11 2233-4455</p>
          <p><strong>Email:</strong> contacto@propiedades.com</p>
        </aside>
      )}
    </div>
  );
};

