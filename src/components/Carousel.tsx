// Carousel.tsx
import { FaBath, FaBed, FaRulerCombined, FaMapMarkerAlt, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { properties } from "../data/mock-properties.ts";
import { slugify } from "../utils/slugify.ts";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export const Carousel = () => {
  const handleOpenDetail = (titulo: string) => {
    const slug = slugify(titulo);
    window.open(`/propiedad/${slug}`, "_blank");
  };
  return (
    <section style={{ width: "100%", padding: "3rem 1rem" }}>
      <h2 style={{ fontSize: "2.5rem", color: "#34495e", fontWeight: 700, marginBottom: "3rem",textAlign:'center' }}>
        Oportunidades en Venta
      </h2>
      <Swiper
        spaceBetween={24}
        slidesPerView={"auto"}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1090: { slidesPerView: 3 },
          1480: { slidesPerView: 4 },
        }}
        style={{ paddingBottom: "2rem" }}
      >
        {properties.map((p) => (
          <SwiperSlide key={p.id} style={{ width: "300px" }}>
            <div
              style={{
                height: "420px",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                background: `url(${p.images[0]}) center/cover no-repeat`,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Franja superior */}
              <div
                onClick={() => handleOpenDetail(p.titulo)}
                style={{
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(6px)",
                  padding: "0.8rem 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0, wordBreak: "break-word" }}>
                  {p.titulo}
                </h3>
                {p.aceptaCredito && (
                  <span
                    style={{
                      background: "#00c853",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "6px",
                      fontSize: ".8rem",
                      display: "flex",
                      alignItems: "center",
                      gap: ".3rem",
                    }}
                  >
                    <FaCheckCircle /> Crédito
                  </span>
                )}
              </div>

              {/* Franja inferior */}
              <div
                style={{
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(6px)",
                  padding: "0.8rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#ffd54f",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: ".4rem",
                  }}
                >
                  <FaMoneyBillWave /> USD {p.precioUSD.toLocaleString("es-AR")}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".4rem", color: "#ddd" }}>
                    <FaMapMarkerAlt /> {p.ubicacion}
                  </div>
                  <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
                      <FaBed /> {p.ambientes}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
                      <FaBath /> {p.banos}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
                      <FaRulerCombined /> {p.metros} m²
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
