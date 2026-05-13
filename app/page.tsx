import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Signatures from "@/components/Signatures";
import Coulisses from "@/components/Coulisses";
import Menu from "@/components/Menu";
import PhotoStrip from "@/components/PhotoStrip";
import Testimonials from "@/components/Testimonials";
import Info from "@/components/Info";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Signatures />
        <Coulisses />
        <Menu />
        <PhotoStrip />
        <Testimonials />
        <Info />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
