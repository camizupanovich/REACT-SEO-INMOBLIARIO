import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";

export const Contact=()=> {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [estado, setEstado] = useState<"idle" | "enviando">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEstado("enviando");
    // Validación simple
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.mensaje) {
      toast.error("Por favor completá todos los campos.");
      return;
    }

    const formPromise = fetch("https://formspree.io/f/xeopzvky", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    toast.promise(
      formPromise,
      {
        loading: "Enviando mensaje...",
        success: "¡Mensaje enviado correctamente! 🎉",
        error: "Ocurrió un error al enviar el mensaje 😢",
      },
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );

    try {
      const res = await formPromise;
      if (res.ok) setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setEstado("idle");
    }
  };

  return (
    <section
      style={{
        maxWidth: "600px",
        margin: "3rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Toaster position="top-right" />
       <h2
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#2c3e50",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Contactanos
        </h2>
        <p style={{ textAlign: "center", color: "#7f8c8d", marginBottom: "2rem" }}>
          ¿Tenés una consulta o querés agendar una visita? Completá el formulario y te responderemos a la brevedad.
        </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="mensaje"
          placeholder="Escribí tu mensaje..."
          value={formData.mensaje}
          onChange={handleChange}
          required
          rows={5}
          style={{ ...inputStyle, resize: "vertical" }}
        ></textarea>
        <button
            type="submit"
            disabled={estado === "enviando"}
            style={{
              background: "#D2691E",
              color: "#fff",
              padding: "0.9rem 1rem",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "background 0.3s",
            }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#f36f10ff")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "#D2691E")}
          >
            {estado === "enviando" ? "Enviando..." : "Enviar mensaje"}
            <FaPaperPlane />
          </button>
      </form>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  width: "100%",
  boxSizing: "border-box",
};
