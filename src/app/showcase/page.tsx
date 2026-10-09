import type { Metadata } from "next";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShowcasePage from "@/components/showcase/ShowcasePage";

export const metadata: Metadata = {
  title: "Showcase - Open Nshipyard",
  description:
    "Try the data: interactive use cases from Toronto's open data and beyond. Pick a street, a ward, a permit type, and see what the city's own files say. Every number traces to a published dataset and method.",
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
