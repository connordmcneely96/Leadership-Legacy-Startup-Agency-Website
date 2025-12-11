import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeHelp from "@/components/WhoWeHelp";
import Services from "@/components/Services";
import WebDevelopment from "@/components/WebDevelopment";
import Creative from "@/components/Creative";
import Process from "@/components/Process";
import Outcomes from "@/components/Outcomes";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <WhoWeHelp />
      <Services />
      <WebDevelopment />
      <Creative />
      <Process />
      <Outcomes />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
