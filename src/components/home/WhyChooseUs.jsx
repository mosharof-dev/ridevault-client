"use client";
import { motion } from "framer-motion";

import { FaTag, FaShieldAlt, FaHeadset, FaCrown } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Best Price Guarantee",
      description: "We offer competitive pricing and seasonal discounts to ensure you get the best deal.",
      icon: <FaTag />,
      color: "from-indigo-600 to-indigo-400",
    },
    {
      id: 2,
      title: "Fully Insured Rides",
      description: "Drive with peace of mind. All our vehicles come with comprehensive insurance coverage.",
      icon: <FaShieldAlt />,
      color: "from-teal-600 to-teal-400",
    },
    {
      id: 3,
      title: "24/7 Customer Support",
      description: "Our dedicated support team is available around the clock to assist you anywhere, anytime.",
      icon: <FaHeadset />,
      color: "from-indigo-600 to-indigo-400",
    },
    {
      id: 4,
      title: "Premium Fleet",
      description: "From luxury sedans to rugged SUVs, choose from our wide range of top-tier vehicles.",
      icon: <FaCrown />,
      color: "from-teal-600 to-teal-400",
    },
  ];

  return (
    <section className="bg-[#FBFAFF] py-20 relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-4 shadow-sm"
          >
            Our Advantages
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">RideVault</span>?
          </h2>
          <p className="text-slate-500 text-lg">
            We prioritize your comfort and safety. Experience the premium car rental service tailored specifically for your needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Subtle Icon Background on Hover */}
              <div className={`absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-full`}></div>

              {/* Icon Circle */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center text-2xl mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>

              {/* Text Content */}
              <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed relative z-10">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;