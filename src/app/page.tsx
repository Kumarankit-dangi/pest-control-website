import { HeroSlider } from "@/components/HeroSlider";
import { ServiceAreaStrip } from "@/components/ServiceAreaStrip";
import { LiveWorkGallery } from "@/components/LiveWorkGallery";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Products } from "@/components/Products";
import { Offers } from "@/components/Offers";
import { Testimonials } from "@/components/Testimonials";
import { BlogSection } from "@/components/BlogSection";
import { Newsletter } from "@/components/Newsletter";
import { Contact } from "@/components/Contact";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      {/* Sliding Hero Banner with user photos & "Your home. Not theirs." reference */}
      <HeroSlider />
      <ServiceAreaStrip />
      {/* Real on-site technician photo gallery & official company poster */}
      <LiveWorkGallery />
      <About />
      <Services />
      <WhyChooseUs />
      <Products />
      <Offers />
      <Testimonials />
      <BlogSection />
      <Newsletter />
      <Contact />
      {/* spacer for mobile sticky call bar */}
      <div className="h-[76px] md:hidden" aria-hidden />
    </>
  );
}
