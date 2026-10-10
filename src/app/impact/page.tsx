import type { Metadata } from "next";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ImpactPage from "@/components/ImpactPage";

export const metadata: Metadata = {
  title: "Impact - Open Nshipyard",
  description:
    "What Open Nshipyard enables: cleaned public records turned into answers you can act on. 40 projects, 9M+ records, every method published.",
};

export default function Page() {
  return (
    <div id="top">
      <Banner />
      <Nav />
      <ImpactPage />
      <Footer />
    </div>
  );
}
