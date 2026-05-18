import Banner from "@/components/home/Banner";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function Home() {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
