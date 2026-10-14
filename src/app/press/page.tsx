import type { Metadata } from "next";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PressPage from "@/components/PressPage";

export const metadata: Metadata = {
  title: "Press kit - Open Nshipyard",
  description:
    "Download the Open Nshipyard logo in every size, plus usage ground rules for press coverage.",
};

export default function Page() {
  return (
    <div id="top">
      <Banner />
      <Nav />
      <PressPage />
      <Footer />
    </div>
  );
}
