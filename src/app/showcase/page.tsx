import type { Metadata } from "next";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShowcasePage from "@/components/showcase/ShowcasePage";

export const metadata: Metadata = {
  title: "Data stories - Open Nshipyard",
  description:
    "Nine quotable, citable findings computed from Toronto's open data: permit waits, homes gained, 311 equity, pipe age, parking enforcement, and more. Every number traces to a published dataset and method.",
};

export default function Page() {
  return (
    <div id="top">
      <Banner />
      <Nav />
      <ShowcasePage />
      <Footer />
    </div>
  );
}
