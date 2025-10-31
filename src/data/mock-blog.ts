import { slugify } from "../utils/slugify";

export type BlogPost = {
  id: number;
  titulo: string;
  descripcion: string;
  tags: string[];
  fecha: string;
  imagen: string;
  slug: string;
  longDescription:string;
};
export const mockBlog: BlogPost[] = [
  {
    id: 1,
    titulo: "Cómo la inflación impacta en la inversión inmobiliaria",
    descripcion: "Analizamos cómo la inflación afecta precios, alquileres y oportunidades de inversión.",
    tags: ["Inflación", "Inversión", "Argentina"],
    fecha: "2025-10-01",
    imagen: "/blog1.jpeg",
    slug: slugify("Cómo la inflación impacta en la inversión inmobiliaria"),
    longDescription: `La inflación en Argentina tiene un efecto directo sobre el mercado inmobiliario. 
Los precios de propiedades se ajustan constantemente y los contratos de alquiler pueden perder poder adquisitivo. 
En esta entrada analizamos estadísticas recientes, estrategias para proteger tu inversión y consejos 
sobre cuándo es el mejor momento para comprar o vender.`
  },
  {
    id: 2,
    titulo: "Impacto del cambio de gobierno en el sector inmobiliario",
    descripcion: "Cómo las políticas públicas y cambios de administración afectan la inversión.",
    tags: ["Política", "Mercado", "Inmobiliaria"],
    fecha: "2025-09-28",
    imagen: "/blog2.jpg",
    slug: slugify("Impacto del cambio de gobierno en el sector inmobiliario"),
    longDescription: `Los cambios de gobierno suelen influir en el mercado inmobiliario mediante políticas de crédito, 
impuestos y regulación de alquileres. Esta entrada explica los posibles escenarios y cómo los inversores pueden 
anticiparse a las decisiones políticas para minimizar riesgos y aprovechar oportunidades.`
  },
  {
    id: 3,
    titulo: "Por qué invertir en propiedades ahora",
    descripcion: "Razones para apostar por el sector inmobiliario pese a la incertidumbre económica.",
    tags: ["Inversión", "Oportunidad", "Propiedades"],
    fecha: "2025-09-20",
    imagen: "/blog3.jpg",
    slug: slugify("Por qué invertir en propiedades ahora"),
    longDescription: `Invertir en propiedades sigue siendo una de las formas más seguras de resguardar capital. 
Analizamos los beneficios de comprar departamentos y casas en zonas emergentes, la rentabilidad esperada y cómo 
los inversores pueden diversificar su portafolio para protegerse frente a la inflación y la volatilidad económica.`
  },
  {
    id: 4,
    titulo: "Estadísticas de alquileres más buscados en 2025",
    descripcion: "Descubrí qué tipos de propiedades y barrios están en alta demanda.",
    tags: ["Alquileres", "Estadísticas", "Mercado"],
    fecha: "2025-10-05",
    imagen: "/blog4.jpg",
    slug: slugify("Estadísticas de alquileres más buscados en 2025"),
    longDescription: `El mercado de alquileres en Argentina muestra tendencias claras: departamentos de 1 y 2 ambientes 
en barrios céntricos siguen siendo los más demandados, mientras que las casas con jardín ganan popularidad 
en zonas suburbanas. Analizamos datos recientes y te contamos cómo aprovechar esta información para invertir o alquilar tu propiedad.`
  },
  {
    id: 5,
    titulo: "Tips clave al comprar tu primera propiedad",
    descripcion: "Errores comunes y cómo evitarlos al invertir en inmobiliaria.",
    tags: ["Compra", "Tips", "Inversión"],
    fecha: "2025-09-25",
    imagen: "/blog5.jpeg",
    slug: slugify("Tips clave al comprar tu primera propiedad"),
    longDescription: `Comprar tu primera propiedad puede ser emocionante pero desafiante. 
Consejos prácticos sobre cómo evaluar barrios, servicios cercanos, financiamiento y escritura. 
Incluye tips para negociar el precio y evitar sorpresas durante la compra, asegurando que tu inversión sea segura y rentable.`
  },
  // Entradas 6-10, que son las anteriores últimas que teníamos
  {
    id: 6,
    titulo: "Cómo mejorar tu SEO inmobiliario en 2025",
    descripcion: "Guía práctica para posicionar tu inmobiliaria con contenido optimizado.",
    tags: ["SEO", "Marketing", "Inmobiliaria"],
    fecha: "2025-10-25",
    imagen: "/blog6.jpg",
    slug: slugify("Cómo mejorar tu SEO inmobiliario en 2025"),
    longDescription: `Posicionar tu inmobiliaria en buscadores es clave para atraer más clientes potenciales. 
Esta guía práctica detalla estrategias de SEO específicas para propiedades, incluyendo optimización de 
descripciones, uso de imágenes y videos, y cómo organizar la información para que Google y otros buscadores comprendan tu oferta.`
  },
  {
    id: 7,
    titulo: "Diseño accesible en sitios inmobiliarios",
    descripcion: "Consejos para interfaces inclusivas y fáciles de usar.",
    tags: ["Accesibilidad", "UI/UX", "Inmobiliaria"],
    fecha: "2025-10-20",
    imagen: "/blog4.jpg",
    slug: slugify("Diseño accesible en sitios inmobiliarios"),
    longDescription: `Un sitio web de inmobiliaria debe ser accesible para todos los usuarios. 
Desde personas con discapacidad visual hasta quienes navegan desde móviles, ofrecer una experiencia inclusiva aumenta la confianza y el alcance.`
  },
  {
    id: 9,
    titulo: "Oportunidades en propiedades comerciales",
    descripcion: "Cómo detectar locales y oficinas con potencial de renta y valorización.",
    tags: ["Comercial", "Inversión", "Alquiler"],
    fecha: "2025-10-22",
    imagen: "/blog1.jpeg",
    slug: slugify("Oportunidades en propiedades comerciales"),
    longDescription: `El segmento comercial de la inmobiliaria ofrece oportunidades únicas para inversores. 
Desde locales en zonas de alto tránsito hasta oficinas corporativas, analizamos qué propiedades ofrecen mayor retorno y cuáles son los riesgos más frecuentes.`
  },
  {
    id: 10,
    titulo: "Tendencias de vivienda post-pandemia",
    descripcion: "Qué buscan los argentinos al elegir propiedades después de la pandemia.",
    tags: ["Tendencias", "Vivienda", "Inmobiliaria"],
    fecha: "2025-10-08",
    imagen: "/blog3.jpg",
    slug: slugify("Tendencias de vivienda post-pandemia"),
    longDescription: `La pandemia cambió las prioridades de los argentinos al momento de elegir vivienda. 
Hoy se valoran espacios al aire libre, oficinas en casa, y barrios con servicios cercanos. Analizamos los cambios de comportamiento de compradores y arrendatarios.`
  }
];
