import type { Metadata } from "next";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DataFixesPage from "@/components/DataFixesPage";

export const metadata: Metadata = {
  title: "Data Fixes Log - Open Nshipyard",
  description:
    "The repair log behind every Nshipyard dataset: what was wrong with the raw open data, the exact cleaning method used, and the before-and-after. Nine Toronto civic datasets, method by method.",
};

export default function Page() {
  return (
    <div id="top">
      <Banner />
      <Nav />
      <DataFixesPage />
      <Footer />
    </div>
  );
}
