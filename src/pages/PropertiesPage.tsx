// src/pages/PropertiesPage.tsx
import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { mockPropertiesAdvanced } from "../data/mock-properties-advanced";
import type { PropertyAdvanced } from "../data/mock-properties-advanced";
import { PropertyCard } from "../components/PropertyCard";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { FaList, FaMap, FaFilter, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { PropertyModal } from "../components/PropertyModal";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const PAGE_SIZE = 6;

export const PropertiesPage: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  // filtros
  const [qOperacion, setQOperacion] = useState<string>(params.get("operacion") || "");
  const [qTipo, setQTipo] = useState<string[]>([]);
  const [qUbicacion, setQUbicacion] = useState<string>(params.get("ubicacion") || "");
  const [qAmbientes, setQAmbientes] = useState<string>(params.get("ambientes") || "");
  const [qBanos, setQBanos] = useState<string>("");
  const [qTags, setQTags] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");
  const [sortBy, setSortBy] = useState<"precio_desc" | "precio_asc" | "fecha_desc" | "fecha_asc">("precio_desc");

  // estado visual
  const [view, setView] = useState<"list" | "map">("list");
  const [selectedProperty, setSelectedProperty] = useState<PropertyAdvanced | null>(null);
  const [itemsToShow, setItemsToShow] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const types: string[] = ["depto", "ph", "casa", "lote", "campo", "comercial"];
  const tags: string[] = ["pileta", "balcon", "terraza", "luminoso", "garage", "jardin", "aire"];

  const toggleType = (t: string) => setQTipo(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const toggleTag = (t: string) => setQTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  // filtrado memoizado
  const filtered = useMemo(() => {
    let res: PropertyAdvanced[] = [...mockPropertiesAdvanced];
    if (qOperacion) res = res.filter(p => p.operacion === qOperacion);
    if (qTipo.length) res = res.filter(p => qTipo.includes(p.tipo));
    if (qUbicacion) res = res.filter(p => p.ubicacion.toLowerCase().includes(qUbicacion.toLowerCase()));
    if (qAmbientes) res = res.filter(p => p.ambientes >= parseInt(qAmbientes, 10));
    if (qBanos) res = res.filter(p => p.banos >= parseInt(qBanos, 10));
    if (qTags.length) res = res.filter(p => qTags.every(t => p.tags.includes(t as any)));
    if (priceMin !== "") res = res.filter(p => p.precioUSD >= Number(priceMin));
    if (priceMax !== "") res = res.filter(p => p.precioUSD <= Number(priceMax));

    res.sort((a, b) => {
      switch (sortBy) {
        case "precio_asc": return a.precioUSD - b.precioUSD;
        case "precio_desc": return b.precioUSD - a.precioUSD;
        case "fecha_asc": return new Date(a.fechaPublicacion).getTime() - new Date(b.fechaPublicacion).getTime();
        case "fecha_desc":
        default: return new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime();
      }
    });

    return res;
  }, [qOperacion, qTipo, qUbicacion, qAmbientes, qBanos, qTags, priceMin, priceMax, sortBy]);

  const pageData = filtered.slice(0, itemsToShow);

const navigate = useNavigate();
// tu función resetFilters
const resetFilters = () => {
  setQOperacion("");
  setQTipo([]);
  setQUbicacion("");
  setQAmbientes("");
  setQBanos("");
  setQTags([]);
  setPriceMin("");
  setPriceMax("");
  setSortBy("precio_desc");
  setItemsToShow(PAGE_SIZE);

  // Limpiar query params
  navigate({ pathname: "/propiedades", search: "" }, { replace: true });
};


  // scroll infinito
  const loadMore = useCallback(() => setItemsToShow(prev => Math.min(prev + PAGE_SIZE, filtered.length)), [filtered.length]);

  useEffect(() => {
    if (lastItemRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) loadMore(); },
        { threshold: 1 }
      );
      observerRef.current.observe(lastItemRef.current);
    }
    return () => observerRef.current?.disconnect();
  }, [lastItemRef.current, loadMore]);

  // Mapbox
  useEffect(() => {
    if (view === "map" && mapContainer.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-58.3816, -34.6037],
        zoom: 12,
      });
      mapRef.current.addControl(new mapboxgl.NavigationControl());
    }

    if (view === "map" && mapRef.current) {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      filtered.forEach(p => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<img src="${p.images[0]}" style="width:100%;height:auto;"/> <br/>
          <strong>${p.titulo}</strong><br/>
          USD ${p.precioUSD.toLocaleString()}<br/>
          ${p.ambientes} ambientes • ${p.banos} baños
        `);

        const el = document.createElement("div");
        el.className = "marker";
        el.innerHTML = `<span style="background:#D2691E;color:white;padding:4px 6px;border-radius:4px;font-size:12px;font-weight:bold;">USD ${p.precioUSD.toLocaleString()}</span>`;

        const marker = new mapboxgl.Marker(el)
          .setLngLat([p.coords.lng, p.coords.lat])
          .setPopup(popup)
          .addTo(mapRef.current!);

        markersRef.current.push(marker);
      });

      if (filtered.length) {
        const bounds = new mapboxgl.LngLatBounds();
        filtered.forEach(p => bounds.extend([p.coords.lng, p.coords.lat]));
        mapRef.current.fitBounds(bounds, { padding: 100 });
      }
    }
  }, [view, filtered]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: window.innerWidth > 1024 ? "300px 1fr" : "1fr", gap: 16, padding: 16, maxWidth: 1400, margin: "0 auto", marginTop:"3rem" }}>
      
      {/* Sidebar filtros desktop */}
      {window.innerWidth > 1024 && (
        <aside style={{ display: "grid", gap: 16, background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", height: "fit-content" }}>
          <h3>Filtros</h3>
          <select value={qOperacion} onChange={e => setQOperacion(e.target.value)} style={{ padding: 8, borderRadius: 6 }}>
            <option value="">Operación</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>

          <fieldset style={{ border: "1px solid #ccc", borderRadius: 6, padding: 8 }}>
            <legend>Tipo de propiedad</legend>
            {types.map(t => (
              <label key={t} style={{ display: "block", cursor: "pointer" }}>
                <input type="checkbox" checked={qTipo.includes(t)} onChange={() => toggleType(t)} /> {t}
              </label>
            ))}
          </fieldset>

          <input type="text" placeholder="Ubicación" value={qUbicacion} onChange={e => setQUbicacion(e.target.value)} style={{ padding: 8, borderRadius: 6 }} />
          <input type="number" placeholder="Ambientes ≥" value={qAmbientes} onChange={e => setQAmbientes(e.target.value)} style={{ padding: 8, borderRadius: 6 }} />
          <input type="number" placeholder="Baños ≥" value={qBanos} onChange={e => setQBanos(e.target.value)} style={{ padding: 8, borderRadius: 6 }} />
          <input type="number" placeholder="Precio min" value={priceMin} onChange={e => setPriceMin(e.target.value ? Number(e.target.value) : "")} style={{ padding: 8, borderRadius: 6 }} />
          <input type="number" placeholder="Precio max" value={priceMax} onChange={e => setPriceMax(e.target.value ? Number(e.target.value) : "")} style={{ padding: 8, borderRadius: 6 }} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} style={{ padding: 8, borderRadius: 6 }}>
            <option value="precio_desc">Precio ↓</option>
            <option value="precio_asc">Precio ↑</option>
            <option value="fecha_desc">Fecha ↓</option>
            <option value="fecha_asc">Fecha ↑</option>
          </select>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tags.map(t => (
              <button key={t} onClick={() => toggleTag(t)} style={{
                padding: "4px 8px", borderRadius: 6, border: "1px solid #ccc",
                background: qTags.includes(t) ? "#D2691E" : "#fff",
                color: qTags.includes(t) ? "#fff" : "#333", cursor: "pointer"
              }}>{t}</button>
            ))}
          </div>
          <button onClick={resetFilters} style={{ padding: 8, borderRadius: 6, background: "#D2691E", color: "#fff", cursor: "pointer",outline:"none", borderColor:"#D2691e" }}>Reset Filtros</button>
        </aside>
      )}

      {/* Main */}
      <main style={{ display: "grid", gap: 16 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Propiedades ({filtered.length})</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {window.innerWidth <= 1024 && <button onClick={() => setDrawerOpen(true)} style={{ padding: 8, borderRadius: 8, background: "#f5f5f5", border: "none", cursor: "pointer" }}><FaFilter /> Filtros</button>}
            <button onClick={() => setView("list")} style={{ padding: 8, borderRadius: 8, background: view === "list" ? "#D2691E" : "#f5f5f5", color: view === "list" ? "#fff" : "#333", border: "none", cursor: "pointer" }}><FaList /> Lista</button>
            <button onClick={() => setView("map")} style={{ padding: 8, borderRadius: 8, background: view === "map" ? "#D2691E" : "#f5f5f5", color: view === "map" ? "#fff" : "#333", border: "none", cursor: "pointer" }}><FaMap /> Mapa</button>
          </div>
        </div>

        {/* Vista lista */}
        {view === "list" && (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
              {pageData.map((p, idx) => {
                const isLast = idx === pageData.length - 1;
                return <div ref={isLast ? lastItemRef : null} key={p.id}>
                  <PropertyCard property={p} onSelect={() => setSelectedProperty(p)} highlight={selectedProperty?.id === p.id} />
                </div>;
              })}
            </div>
          </div>
        )}

        {/* Vista mapa */}
        {view === "map" && <div ref={mapContainer} style={{ width: "100%", height: 600, borderRadius: 8, overflow: "hidden" }} />}
{selectedProperty && (
    <PropertyModal property={selectedProperty} inModal onClose={() => setSelectedProperty(null)} />
)}
      </main>

      {/* Drawer filtros móviles */}
      {drawerOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "grid", placeItems: "center"
        }}>
          <div style={{ width: "90%", maxWidth: 400, background: "#fff", padding: 16, borderRadius: 8, position: "relative", maxHeight: "90%", overflowY: "auto" }}>
            <button onClick={() => setDrawerOpen(false)} style={{ position: "absolute", top: 8, right: 8, border: "none", background: "none", cursor: "pointer", fontSize: 20 }}><FaTimes /></button>
            <h3>Filtros</h3>
            <select value={qOperacion} onChange={e => setQOperacion(e.target.value)} style={{ padding: 8, borderRadius: 6, width: "100%", marginBottom: 8 }}>
              <option value="">Operación</option>
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
            </select>

            <fieldset style={{ border: "1px solid #ccc", borderRadius: 6, padding: 8, marginBottom: 8 }}>
              <legend>Tipo de propiedad</legend>
              {types.map(t => (
                <label key={t} style={{ display: "block", cursor: "pointer" }}>
                  <input type="checkbox" checked={qTipo.includes(t)} onChange={() => toggleType(t)} /> {t}
                </label>
              ))}
            </fieldset>

            <input type="text" placeholder="Ubicación" value={qUbicacion} onChange={e => setQUbicacion(e.target.value)} style={{ padding: 8, borderRadius: 6, width: "100%", marginBottom: 8 }} />
            <input type="number" placeholder="Ambientes ≥" value={qAmbientes} onChange={e => setQAmbientes(e.target.value)} style={{ padding: 8, borderRadius: 6, width: "100%", marginBottom: 8 }} />
            <input type="number" placeholder="Baños ≥" value={qBanos} onChange={e => setQBanos(e.target.value)} style={{ padding: 8, borderRadius: 6, width: "100%", marginBottom: 8 }} />
            <input type="number" placeholder="Precio min" value={priceMin} onChange={e => setPriceMin(e.target.value ? Number(e.target.value) : "")} style={{ padding: 8, borderRadius: 6, width: "100%", marginBottom: 8 }} />
            <input type="number" placeholder="Precio max" value={priceMax} onChange={e => setPriceMax(e.target.value ? Number(e.target.value) : "")} style={{ padding: 8, borderRadius: 6, width: "100%", marginBottom: 8 }} />

            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} style={{ padding: 8, borderRadius: 6, width: "100%", marginBottom: 8 }}>
              <option value="precio_desc">Precio ↓</option>
              <option value="precio_asc">Precio ↑</option>
              <option value="fecha_desc">Fecha ↓</option>
              <option value="fecha_asc">Fecha ↑</option>
            </select>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
              {tags.map(t => (
                <button key={t} onClick={() => toggleTag(t)} style={{
                  padding: "4px 8px", borderRadius: 6, border: "1px solid #ccc",
                  background: qTags.includes(t) ? "#D2691E" : "#fff",
                  color: qTags.includes(t) ? "#fff" : "#333", cursor: "pointer"
                }}>{t}</button>
              ))}
            </div>
            <button onClick={resetFilters} style={{ padding: 8, borderRadius: 6, background: "#D2691E", color: "#fff", width: "100%" }}>Reset Filtros</button>
          </div>
        </div>
      )}
    </div>
  );
};

