import Banner from "@/components/home/Banner";
import CallToAction from "@/components/home/CallToAction";
import FeaturedCars from "@/components/home/FeaturedCars";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default async function Home() {
  let initialCars = [];
  try {
    // SSR Data Fetching with  Cache
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featuredCars`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (res.ok) {
      initialCars = await res.json();
    }
  } catch (error) {
    console.error("SSR Fetch Error:", error);
  }

  return (
    <div>
      {/* Main Content */}
      <Banner />
      
      <FeaturedCars initialCars={initialCars} />
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
