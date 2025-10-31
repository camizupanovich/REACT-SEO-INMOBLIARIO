import { Helmet } from "react-helmet";
import { Hero } from "../components/Hero";
import { Testimonials } from "../components/Testimonials";
import { Carousel } from "../components/Carousel";
import { TextSection } from "../components/TextSection";
import { BlogPreviewGrid } from "../components/BlogPreviewGrid";
import { Contact } from "../components/Contact";
import { FAQPage } from "./Faq";

export const Home = () => (
  <>
    <Helmet>
      <title>Inicio | React SEO Blog</title>
      <meta name="description" content="Landing con blog y secciones informativas optimizadas para SEO." />
    </Helmet>
    <Hero />
    <Carousel/>
    <TextSection />
    <FAQPage limit={3} />
    <Testimonials />
    <BlogPreviewGrid />
    <Contact />
  </>
);
