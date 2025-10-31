// src/data/mock-properties-advanced.ts
export type PropertyType = "depto" | "ph" | "casa" | "lote" | "campo" | "comercial";
export type Tag = "pileta" | "balcon" | "terraza" | "luminoso" | "garage" | "jardin" | "aire";

export type PropertyAdvanced = {
  id: number;
  titulo: string;
  tipo: PropertyType;
  operacion: "compra" | "venta" | "inversion";
  ubicacion: string;
  coords: { lat: number; lng: number };
  precioUSD: number;
  ambientes: number;
  banos: number;
  metros: number;
  fechaPublicacion: string; // ISO date
  tags: Tag[];
  images: string[]; // ej: ['/prop1.jpg','/prop2.jpg']
  aceptaCredito: boolean;
  descripcion: string;
  longDescription?: string;
};

export const mockPropertiesAdvanced: PropertyAdvanced[] = [
  {
    id: 1,
    titulo: "Departamento Moderno en Recoleta",
    tipo: "depto",
    operacion: "venta",
    ubicacion: "Recoleta, CABA",
    coords: { lat: -34.5883, lng: -58.3920 },
    precioUSD: 120000,
    ambientes: 3,
    banos: 2,
    metros: 85,
    fechaPublicacion: "2025-10-01",
    tags: ["luminoso", "balcon"],
    images: ["/prop1.jpg", "/prop2.jpg", "/prop3.jpg"],
    aceptaCredito: true,
    descripcion: "Departamento amplio y luminoso, ideal familia.",
    longDescription:
      "Departamento de 3 ambientes en Recoleta, cocina integrada, balcón a la calle. Cercano a transporte y comercios. Excelente luminosidad norte.",
  },
  {
    id: 2,
    titulo: "Casa con Jardín en Pilar",
    tipo: "casa",
    operacion: "venta",
    ubicacion: "Pilar, Buenos Aires",
    coords: { lat: -34.5150, lng: -58.9853 },
    precioUSD: 250000,
    ambientes: 4,
    banos: 3,
    metros: 150,
    fechaPublicacion: "2025-09-18",
    tags: ["jardin", "garage"],
    images: ["/prop1.jpg", "/prop2.jpg"],
    aceptaCredito: false,
    descripcion: "Casa familiar con jardín y parrilla.",
    longDescription:
      "Casa en barrio privado de Pilar, pileta opcional, gran jardín, cochera doble. Orientación norte, ideal para familias que buscan tranquilidad.",
  },
  {
    id: 3,
    titulo: "Departamento Minimalista en Palermo",
    tipo: "depto",
    operacion: "venta",
    ubicacion: "Palermo, CABA",
    coords: { lat: -34.5850, lng: -58.4316 },
    precioUSD: 180000,
    ambientes: 2,
    banos: 1,
    metros: 70,
    fechaPublicacion: "2025-10-12",
    tags: ["luminoso", "terraza"],
    images: ["/prop1.jpg", "/prop2.jpg"],
    aceptaCredito: true,
    descripcion: "Departamento moderno con terraza común.",
    longDescription:
      "Ideal inversores o primer vivienda. Cocina equipada, excelente conectividad con transporte y vida nocturna cercana.",
  },
  {
    id: 4,
    titulo: "Penthouse con Vista al Río en Puerto Madero",
    tipo: "ph",
    operacion: "venta",
    ubicacion: "Puerto Madero, CABA",
    coords: { lat: -34.6090, lng: -58.3639 },
    precioUSD: 480000,
    ambientes: 5,
    banos: 4,
    metros: 220,
    fechaPublicacion: "2025-08-30",
    tags: ["terraza", "luminoso", "garage"],
    images: ["/prop1.jpg", "/prop2.jpg"],
    aceptaCredito: true,
    descripcion: "Penthouse premium con vista al río.",
    longDescription:
      "Diseño de autor, amplias terrazas, cocina de concepto abierto, seguridad 24hs. Excelente para quien busca estado premium.",
  },
  {
    id: 5,
    titulo: "Lote a orillas del Lago en El Tigre",
    tipo: "lote",
    operacion: "compra",
    ubicacion: "Tigre, Provincia de Buenos Aires",
    coords: { lat: -34.4411, lng: -58.5765 },
    precioUSD: 85000,
    ambientes: 0,
    banos: 0,
    metros: 800,
    fechaPublicacion: "2025-07-10",
    tags: ["luminoso"],
    images: ["/prop1.jpg", "/prop2.jpg"],
    aceptaCredito: false,
    descripcion: "Lote ideal para proyecto de fin de semana.",
    longDescription:
      "Parcela con fácil acceso por ruta, servicios próximos. Vistas al lago y entorno arbolado.",
  },
  {
    id: 6,
    titulo: "Casa de Campo en San Antonio de Areco",
    tipo: "campo",
    operacion: "venta",
    ubicacion: "San Antonio de Areco, Provincia de Buenos Aires",
    coords: { lat: -34.2460, lng: -59.4678 },
    precioUSD: 195000,
    ambientes: 3,
    banos: 2,
    metros: 140,
    fechaPublicacion: "2025-06-05",
    tags: ["jardin", "pileta"],
    images: ["/prop1.jpg", "/prop2.jpg"],
    aceptaCredito: false,
    descripcion: "Casa de campo con pileta y quincho.",
    longDescription:
      "Estancia restaurada, montes y laguna. Ideal para segunda residencia o emprendimiento rural.",
  },
  {
    id: 7,
    titulo: "Local Comercial en Microcentro",
    tipo: "comercial",
    operacion: "venta",
    ubicacion: "Microcentro, CABA",
    coords: { lat: -34.6075, lng: -58.3816 },
    precioUSD: 210000,
    ambientes: 0,
    banos: 1,
    metros: 95,
    fechaPublicacion: "2025-10-05",
    tags: ["luminoso"],
    images: ["/prop1.jpg", "/prop2.jpg"],
    aceptaCredito: false,
    descripcion: "Local con gran vidriera y tránsito peatonal.",
    longDescription:
      "Apto gastronomía o retail. Gran visibilidad en una de las arterias principales del centro.",
  },
  {
    id: 8,
    titulo: "Departamento Buenavista en Belgrano",
    tipo: "depto",
    operacion: "venta",
    ubicacion: "Belgrano, CABA",
    coords: { lat: -34.5604, lng: -58.4606 },
    precioUSD: 200000,
    ambientes: 3,
    banos: 2,
    metros: 95,
    fechaPublicacion: "2025-09-01",
    tags: ["balcon", "luminoso"],
    images: ["/prop1.jpg", "/prop2.jpg"],
    aceptaCredito: true,
    descripcion: "Departamento con balcón y vista arbolada.",
    longDescription:
      "Excelente distribución, living comedor con balcon, cocina independiente, cercano a colegios y servicios.",
  },
  {
    id: 9,
    titulo: "Monoambiente Premium en San Nicolás",
    tipo: "depto",
    operacion: "inversion",
    ubicacion: "San Nicolás, CABA",
    coords: { lat: -34.6070, lng: -58.3750 },
    precioUSD: 95000,
    ambientes: 1,
    banos: 1,
    metros: 38,
    fechaPublicacion: "2025-10-20",
    tags: ["luminoso"],
    images: ["/prop1.jpg", "/prop2.jpg"],
    aceptaCredito: false,
    descripcion: "Monoambiente para renta o primera inversión.",
    longDescription:
      "Ubicación estratégica para alquileres corporativos y temporarios, alta demanda en la zona.",
  },
  {
    id: 10,
    titulo: "Duplex Moderno en Olivos",
    tipo: "casa",
    operacion: "venta",
    ubicacion: "Olivos, Provincia de Buenos Aires",
    coords: { lat: -34.4760, lng: -58.5020 },
    precioUSD: 275000,
    ambientes: 4,
    banos: 3,
    metros: 160,
    fechaPublicacion: "2025-10-22",
    tags: ["jardin", "garage", "terraza"],
    images: ["/prop1.jpg", "/prop2.jpg"],
    aceptaCredito: true,
    descripcion: "Duplex con jardín y cochera.",
    longDescription:
      "Diseño contemporáneo, amplio living comedor, cocina equipada y espacios exteriores ideales para familia.",
  },
];
