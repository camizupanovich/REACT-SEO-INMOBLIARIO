import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import { ref as dbRef, push, update, get } from "firebase/database";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { database, storage } from "../firebase"; // ajustá la ruta si hace falta
import type { PropertyAdvanced, PropertyType, Tag } from "../../data/mock-properties-advanced";
import "./PropertyForm.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

/**
 * Nota:
 * - Para crear: ruta /admin/properties/new  (no viene :id)
 * - Para editar: ruta /admin/properties/:id
 *
 * Guardamos payload.id = Date.now() (numérico) para mantener tu tipo PropertyAdvanced,
 * y la propiedad en Realtime DB se crea/actualiza bajo la key generada por push/update.
 */

const propertyTypes: PropertyType[] = ["depto", "ph", "casa", "lote", "campo", "comercial"];
const tagsList: Tag[] = ["pileta", "balcon", "terraza", "luminoso", "garage", "jardin", "aire"];

export const PropertyForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<PropertyAdvanced>({
    id: Date.now(),
    titulo: "",
    tipo: "depto",
    operacion: "venta",
    ubicacion: "",
    coords: { lat: -34.6037, lng: -58.3816 },
    precioUSD: 0,
    ambientes: 1,
    banos: 1,
    metros: 0,
    fechaPublicacion: new Date().toISOString(),
    tags: [],
    images: [],
    aceptaCredito: false,
    descripcion: "",
    longDescription: "",
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  // Mapbox refs
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  // load if editing
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      try {
        const snap = await get(dbRef(database, `properties/${id}`));
        if (!snap.exists()) {
          setError("No se encontró la propiedad.");
          setLoading(false);
          return;
        }
        const data = snap.val();
        // Normalizar datos
        setFormData({
          id: Number(data.id ?? Date.now()),
          titulo: data.titulo ?? "",
          tipo: (data.tipo as PropertyType) ?? "depto",
          operacion: data.operacion ?? "venta",
          ubicacion: data.ubicacion ?? "",
          coords: data.coords ?? { lat: -34.6037, lng: -58.3816 },
          precioUSD: Number(data.precioUSD ?? 0),
          ambientes: Number(data.ambientes ?? 1),
          banos: Number(data.banos ?? 1),
          metros: Number(data.metros ?? 0),
          fechaPublicacion: data.fechaPublicacion ?? new Date().toISOString(),
          tags: Array.isArray(data.tags) ? data.tags : [],
          images: Array.isArray(data.images) ? data.images : [],
          aceptaCredito: Boolean(data.aceptaCredito),
          descripcion: data.descripcion ?? "",
          longDescription: data.longDescription ?? "",
        });
      } catch (err) {
        console.error(err);
        setError("Error al cargar la propiedad.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Init / update map preview
  useEffect(() => {
    if (!mapContainer.current) return;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [formData.coords.lng, formData.coords.lat],
        zoom: 13,
      });
      mapRef.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    }

    // update marker
    if (markerRef.current) markerRef.current.remove();
    markerRef.current = new mapboxgl.Marker({ color: "#D2691E" })
      .setLngLat([formData.coords.lng, formData.coords.lat])
      .addTo(mapRef.current);

    // fly
    try {
      mapRef.current.flyTo({ center: [formData.coords.lng, formData.coords.lat], essential: true, zoom: 13 });
    } catch (err) {
      // ignore small errors
    }

    // cleanup not destroying map to keep preview snappy
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapContainer.current, formData.coords.lat, formData.coords.lng]);

  // Geocoding suggestions
  const handleSearchLocation = async (q: string) => {
    setFormData((f) => ({ ...f, ubicacion: q }));
    setSuggestions([]);
    if (q.length < 3) {
      setSuggestions([]);
      return;
    }
    setSearching(true);
    setError(null);
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json?access_token=${mapboxgl.accessToken}&limit=6&country=AR`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error geocoding");
      const data = await res.json();
      setSuggestions(data.features || []);
    } catch (err) {
      console.error(err);
      setError("Error buscando ubicaciones. Revisá tu token Mapbox.");
    } finally {
      setSearching(false);
    }
  };

  const handleSelectLocation = (place: any) => {
    if (!place) return;
    const center = place.center || [formData.coords.lng, formData.coords.lat];
    setFormData((f) => ({
      ...f,
      ubicacion: place.place_name,
      coords: { lat: center[1], lng: center[0] },
    }));
    setSuggestions([]);
  };

  // Generic form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as any;
    const parsed = type === "checkbox" ? checked : (type === "number" ? (value === "" ? "" : Number(value)) : value);
    setFormData((prev) => ({ ...prev, [name]: parsed }));
  };

  const toggleTag = (t: Tag) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.includes(t) ? prev.tags.filter(x => x !== t) : [...prev.tags, t] }));
  };

  // images
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;
    if (files.length + (formData.images?.length || 0) > 7) {
      setError("No podés subir más de 7 imágenes en total.");
      return;
    }

    const over = files.find(f => f.size > 300 * 1024);
    if (over) {
      setError(`La imagen ${over.name} supera 300 KB. Optimizala antes de subir.`);
      return;
    }

    setImageFiles(files);
  };

  // submit
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // basic validation
    if (!formData.titulo || !formData.ubicacion || !formData.precioUSD) {
      setError("Completá título, ubicación y precio antes de guardar.");
      return;
    }

    setSaving(true);
    try {
      // upload new images
      const uploadedUrls = [...(formData.images || [])];
      for (const file of imageFiles) {
        const key = `properties/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const sRef = storageRef(storage, key);
        await uploadBytes(sRef, file);
        const url = await getDownloadURL(sRef);
        uploadedUrls.push(url);
      }

      const payload = {
        ...formData,
        images: uploadedUrls.slice(0, 7),
        fechaPublicacion: formData.fechaPublicacion || new Date().toISOString(),
      };

      if (id) {
        await update(dbRef(database, `properties/${id}`), payload);
      } else {
        // include numeric id for your model
        payload.id = Date.now();
        await push(dbRef(database, `properties`), payload);
      }

      setSuccessMsg("Guardado correctamente.");
      setTimeout(() => navigate("/admin/properties"), 700);
    } catch (err) {
      console.error(err);
      setError("Error al guardar. Reintentá más tarde.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/properties");
  };

  return (
    <div className="property-form-page">

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
        <header className="card-header">
          <h2>{id ? "Editar propiedad" : "Crear nueva propiedad"}</h2>
          <div className="header-actions">
            <button onClick={() => navigate("/admin/properties")} className="btn-ghost">Volver</button>
          </div>
        </header>

        {loading ? (
          <div className="center">Cargando...</div>
        ) : (
          <form className="property-form" onSubmit={handleSubmit} noValidate>
            {error && <div className="alert alert-error" role="alert">{error}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}

            <div className="grid-2">
              <label>
                <span>Título *</span>
                <input name="titulo" value={formData.titulo} onChange={handleChange} required />
              </label>

              <label>
                <span>Precio USD *</span>
                <input name="precioUSD" type="number" value={formData.precioUSD as any} onChange={handleChange} required />
              </label>
            </div>

            <div className="grid-3">
              <label>
                <span>Tipo *</span>
                <select name="tipo" value={formData.tipo} onChange={handleChange}>
                  {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>

              <label>
                <span>Operación *</span>
                <select name="operacion" value={formData.operacion} onChange={handleChange}>
                  <option value="venta">Venta</option>
                  <option value="compra">Compra</option>
                  <option value="inversion">Inversión</option>
                </select>
              </label>

              <label>
                <span>Metros²</span>
                <input name="metros" type="number" value={formData.metros as any} onChange={handleChange} />
              </label>
            </div>

            <label className="full location-field">
              <span>Ubicación *</span>
              <div style={{ position: "relative" }}>
                <input
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={(e) => handleSearchLocation(e.target.value)}
                  placeholder="Dirección, barrio, CP, ciudad..."
                  required
                  autoComplete="off"
                />
                {searching && <div className="hint">Buscando...</div>}
                {suggestions.length > 0 && (
                  <ul className="suggestions" role="listbox">
                    {suggestions.map(s => (
                      <li key={s.id} onClick={() => handleSelectLocation(s)} role="option">
                        {s.place_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </label>

            <div className="grid-3">
              <label>
                <span>Ambientes</span>
                <input name="ambientes" type="number" value={formData.ambientes as any} onChange={handleChange} />
              </label>
              <label>
                <span>Baños</span>
                <input name="banos" type="number" value={formData.banos as any} onChange={handleChange} />
              </label>
              <label className="checkbox-inline">
                <input name="aceptaCredito" type="checkbox" checked={formData.aceptaCredito} onChange={handleChange} />
                <span>Acepta crédito</span>
              </label>
            </div>

            <fieldset className="tags-field">
              <legend>Etiquetas</legend>
              <div className="tags-grid">
                {tagsList.map(t => (
                  <button
                    key={t}
                    type="button"
                    className={formData.tags.includes(t) ? "tag active" : "tag"}
                    onClick={() => toggleTag(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="full">
              <span>Descripción corta</span>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows={4} />
            </label>

            <label className="full">
              <span>Descripción completa (longDescription)</span>
              <textarea name="longDescription" value={formData.longDescription || ""} onChange={handleChange} rows={6} />
            </label>

            <label>
              <span>Imágenes (máx 7, 300 KB c/u)</span>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} />
            </label>

            <div className="preview">
              {(formData.images || []).map((u, i) => (
                <img key={`img-${i}`} src={u} alt={`img-${i}`} />
              ))}
              {imageFiles.map((f, idx) => (
                <div key={`file-${idx}`} className="preview-file">{f.name}</div>
              ))}
            </div>

            <div className="map-preview">
              <label><span>Vista previa del mapa</span></label>
              <div ref={mapContainer} className="mapbox-container" />
              <div className="coords">
                <small>Lat: {Number(formData.coords.lat).toFixed(6)} • Lng: {Number(formData.coords.lng).toFixed(6)}</small>
              </div>
            </div>

            <div className="actions">
              <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default PropertyForm;
