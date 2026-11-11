import type { Metadata } from "next";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TechJobsPage from "@/components/TechJobsPage";

export const metadata: Metadata = {
  title: "State of the Canadian tech job market, late 2026 - Open Nshipyard",
  description:
    "Which tech roles are hiring in Canada, which are shrinking, and where is the work moving? Answered with open Canadian data.",
};

export default function Page() {
  return (
    <div id="top">
      <Banner />
      <Nav />
      <TechJobsPage />
      <Footer />
    </div>
  );
}
