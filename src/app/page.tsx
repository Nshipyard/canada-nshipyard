import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Projects from "@/components/Projects";
import Apps from "@/components/Apps";
import Showcase from "@/components/Showcase";
import Agents from "@/components/Agents";
import OpenSource from "@/components/OpenSource";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top">
      <Banner />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Projects />
        <Apps />
        <Showcase />
        <Agents />
        <OpenSource />
      </main>
      <Footer />
    </div>
  );
}
