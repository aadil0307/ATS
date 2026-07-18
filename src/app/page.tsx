import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import Stats from "@/components/home/Stats";
import SocialProof from "@/components/home/SocialProof";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import BrandShowcase from "@/components/home/BrandShowcase";
import CTASection from "@/components/home/CTASection";
import StructuredData from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <ServicesPreview />
      <Stats />
      <SocialProof />
      <PortfolioPreview />
      <BrandShowcase />
      <CTASection />
    </>
  );
}
