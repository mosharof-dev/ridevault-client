"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper Default CSS
import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Business Executive",
      image: "https://i.pravatar.cc/150?img=47",
      review: "RideVault completely changed my business trips. The cars are always in pristine condition, and the booking process is seamless. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chang",
      role: "Travel Blogger",
      image: "https://i.pravatar.cc/150?img=11",
      review: "I rent cars all over the world, and this platform is by far the most transparent. No hidden fees, and the customer support is incredibly fast.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Russo",
      role: "Family Traveler",
      image: "https://i.pravatar.cc/150?img=32",
      review: "We rented an SUV for our family vacation. The car was spacious, clean, and very safe. The premium feel made our trip even more special.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Miller",
      role: "Car Enthusiast",
      image: "https://i.pravatar.cc/150?img=60",
      review: "The selection of luxury sports cars is unmatched. The delivery to my hotel was smooth. A true 5-star premium experience.",
      rating: 5,
    },
    {
      id: 5,
      name: "Sophia Martinez",
      role: "Corporate Client",
      image: "https://i.pravatar.cc/150?img=5",
      review: "Best rental experience ever! The app interface is sleek, and extending my rental period took just one click. Will use again.",
      rating: 4,
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Freelance Photographer",
      image: "https://i.pravatar.cc/150?img=33",
      review: "Needed a reliable truck for a shoot in the mountains. The vehicle performed flawlessly. Pricing was exactly as quoted upfront.",
      rating: 5,
    }
  ];

  return (
    <section className="bg-white py-20 relative overflow-hidden">
      
      {/* Background Subtle Theme Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-4 shadow-sm"
          >
            Client Feedback
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-teal-500">Thousands</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Don&apos;t just take our word for it. Here is what our premium customers have to say about their RideVault experience.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Autoplay, Pagination]}
            className="w-full pb-16 pt-4 px-2"
          >
            {reviews.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                {/* Review Card -  */}
                <div className="bg-[#FBFAFF] p-8 rounded-2xl border border-indigo-50 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 h-full flex flex-col relative z-10 group">
                  
                  
                  <FaQuoteRight className="absolute top-8 right-8 text-7xl text-indigo-50 -z-10 group-hover:text-indigo-100 transition-colors duration-300" />

                  {/* Rating Stars */}
                  <div className="flex gap-1.5 text-yellow-400 text-[15px] mb-6">
                    {[...Array(5)].map((_, i) => ( 
                      <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-200"} /> 
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-600 leading-relaxed mb-8 italic relative z-10 grow">
                    &quot;{testimonial.review}&quot;
                  </p>

                  {/* User Profile */}
                  <div className="flex items-center gap-4 mt-auto border-t border-indigo-50/60 pt-6">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        fill 
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-[15px]">
                        {testimonial.name}
                      </h4>
                      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-0.5">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      {/* Global Style  */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 0.6;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #4338CA;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;