import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import SansGluten from "@/components/SansGluten";
import Nouveaute from "@/components/Nouveaute";
import Signatures from "@/components/Signatures";
import Coulisses from "@/components/Coulisses";
import Testimonials from "@/components/Testimonials";
import Info from "@/components/Info";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Nouveaute />
        <Signatures />
        <Coulisses />
        <SansGluten />
        <Testimonials />
        <Info />
      </main>
      <Footer />
    </>
  );
}
