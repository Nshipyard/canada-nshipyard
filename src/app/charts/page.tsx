import type { Metadata } from "next";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChartsPageClient from "@/charts/ChartsPageClient";

export const metadata: Metadata = {
  title: "Charts | Open Nshipyard",
  description:
    "One chart per finding, built to be shared. Every number traces to a published open dataset, with the source printed on the card.",
  openGraph: {
    title: "Charts | Open Nshipyard",
    description: "One chart per finding, built to be shared. Every number traces to a published open dataset.",
    images: [{ url: "/charts/permit-wait.png", width: 1080, height: 1440 }],
  },
};

export default function Page() {
  return (
    <div id="top">
      <Banner />
      <Nav />
      <ChartsPageClient />
      <Footer />
    </div>
  );
}
