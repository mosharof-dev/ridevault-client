import Banner from "@/components/home/Banner";
import CallToAction from "@/components/home/CallToAction";
import FeaturedCars from "@/components/home/FeaturedCars";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function Home() {
  return (
    <div>
      {/* Main Content */}
      <Banner />
      
      <FeaturedCars />
      {/* How It Works */}
      <HowItWorks />
      {/* Why Choose Us */}
      <WhyChooseUs />
      {/* Testimonials */}
      <Testimonials />
      {/*  */}
      <CallToAction />
    </div>
  );
}
