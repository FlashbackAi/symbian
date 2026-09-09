import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/HeroCinematic";
import Manifesto from "@/components/sections/Manifesto";
import Hosts from "@/components/sections/Hosts";
import Principles from "@/components/sections/Principles";
import Infrastructure from "@/components/sections/Infrastructure";
import Thesis from "@/components/sections/Thesis";
import Products from "@/components/sections/Products";
import Partners from "@/components/sections/EnterpriseProof";
import ClosingManifesto from "@/components/sections/ClosingManifesto";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Nav />
      <Hero />
      <Manifesto />
      <Hosts />
      <Principles />
      <Infrastructure />
      <Thesis />
      <Products />
      <Partners />
      <ClosingManifesto />
      <Footer />
    </main>
  );
}
