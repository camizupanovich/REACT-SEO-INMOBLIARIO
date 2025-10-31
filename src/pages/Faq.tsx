import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";

interface FAQPageProps {
  limit?: number;
}

interface Question {
  question: string;
  answer: string;
}

export const FAQPage: React.FC<FAQPageProps> = ({ limit }) => {
  const faqs: Question[] = [
    {
      question: "¿Cómo puedo tasar mi propiedad con Zupanovich Propiedades?",
      answer:
        "Podés solicitar una tasación gratuita completando nuestro formulario online o comunicándote directamente con nuestro equipo. Un asesor te contactará para coordinar una visita y realizar una valoración profesional basada en ubicación, estado y demanda de mercado.",
    },
    {
      question: "¿Cuáles son los requisitos para alquilar una propiedad?",
      answer:
        "Necesitás presentar tu DNI, comprobante de ingresos o recibo de sueldo, y una garantía propietaria o seguro de caución. Nuestro equipo te asesorará sobre las opciones más convenientes para tu situación.",
    },
    {
      question: "¿En qué horarios puedo visitar las propiedades?",
      answer:
        "Atendemos de lunes a viernes de 9:00 a 18:00, y los sábados de 9:00 a 13:00. También podés coordinar visitas fuera de horario según disponibilidad del propietario.",
    },
    {
      question: "¿Qué documentos necesito para vender mi propiedad?",
      answer:
        "Se requiere título de propiedad, DNI del propietario, boletas de impuestos al día y plano aprobado. Nuestro equipo legal te guía paso a paso durante todo el proceso.",
    },
    {
      question: "¿Qué diferencia hay entre una reserva y una seña?",
      answer:
        "La reserva bloquea temporalmente la propiedad mientras se analizan los antecedentes del comprador. La seña, en cambio, formaliza el compromiso de venta. Ambas deben estar documentadas por la inmobiliaria.",
    },
    {
      question: "¿Puedo publicar mi propiedad sin exclusividad?",
      answer:
        "Sí, aunque recomendamos firmar un contrato de exclusividad para garantizar una estrategia de marketing más efectiva y personalizada. Esto incluye fotografías profesionales, posicionamiento web y prioridad en nuestro portal.",
    },
    {
      question: "¿Zupanovich Propiedades trabaja con créditos hipotecarios?",
      answer:
        "Sí, brindamos asesoramiento para operaciones con crédito hipotecario. Te ayudamos a evaluar opciones bancarias y coordinar la documentación necesaria para presentar ante la entidad financiera.",
    },
    {
      question: "¿Qué impuestos o gastos debo considerar al comprar una propiedad?",
      answer:
        "Además del valor de venta, se deben contemplar gastos de escribanía, impuestos de sellos y honorarios inmobiliarios. Te entregamos un presupuesto estimado antes de firmar cualquier acuerdo.",
    },
    {
      question: "¿Puedo realizar una reserva online?",
      answer:
        "Sí, contamos con un sistema seguro para realizar reservas digitales a través de nuestro sitio web o WhatsApp. Una vez recibida, te contactamos para validar la documentación.",
    },
    {
      question: "¿Cómo garantizan la seguridad de las operaciones?",
      answer:
        "Todas las operaciones se realizan bajo contratos revisados por nuestro departamento legal y en escribanías de confianza. Además, protegemos tus datos personales conforme a la Ley 25.326 de Protección de Datos Personales.",
    },
  ];

  const displayedFaqs = limit ? faqs.slice(0, limit) : faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "3rem auto 2rem auto",
        padding: "0 1.5rem",
      }}
    >
      {/* SEO */}
      <Helmet>
        <title>Preguntas Frecuentes | Zupanovich Propiedades</title>
        <meta
          name="description"
          content="Respondemos las dudas más comunes sobre compra, venta, tasación y alquiler de propiedades. Asesoramiento inmobiliario profesional en Argentina."
        />
        <meta
          name="keywords"
          content="preguntas frecuentes inmobiliaria, tasación de propiedades, requisitos para alquilar, vender casa, crédito hipotecario, Zupanovich Propiedades"
        />
        <link rel="canonical" href="https://www.zupanovichpropiedades.com/faq" />
      </Helmet>

      {/* Título principal */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "2rem",
          fontWeight: 700,
        }}
      >
        Preguntas Frecuentes
      </motion.h1>

      {/* Acordeón */}
      <div>
        {displayedFaqs.map((faq, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #e0e0e0",
              padding: "1rem 0",
            }}
          >
            <button
              onClick={() => toggle(index)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                textAlign: "left",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#D2691E",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {faq.question}
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: "1.2rem",
                }}
              >
              </motion.span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p
                    style={{
                      marginTop: "0.5rem",
                      lineHeight: 1.6,
                      fontSize: "1rem",
                    }}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};
