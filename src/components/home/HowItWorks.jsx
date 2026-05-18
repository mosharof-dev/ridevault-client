
import { FaMapMarkerAlt, FaCarSide, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Choose Location & Date",
      description: "Select your pick-up location and booking dates easily through our platform.",
      icon: <FaMapMarkerAlt className="text-2xl md:text-3xl" />,
    },
    {
      id: 2,
      title: "Pick Your Dream Car",
      description: "Browse our premium fleet and select the perfect vehicle for your journey.",
      icon: <FaCarSide className="text-2xl md:text-3xl" />,
    },
    {
      id: 3,
      title: "Book & Enjoy the Ride",
      description: "Confirm your booking with zero hidden fees and hit the road safely.",
      icon: <FaCheckCircle className="text-2xl md:text-3xl" />,
    },
  ];

  return (
    <section className="bg-slate-100 py-20 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="text-sm font-bold text-indigo-600 tracking-[0.2em] uppercase mb-3 block">
            Process
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            How It <span className="text-indigo-600">Works</span>
          </h2>
          <p className="text-slate-500 text-lg sm:text-xl leading-relaxed">
            Rent your dream car in just 3 simple and quick steps. We make it easy for you.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          
          {/* Desktop Horizontal Line */}
          <div 
            className="hidden md:block absolute top-13 left-[16.66%] right-[16.66%] h-0.5 bg-indigo-100 z-0" 
            aria-hidden="true"
          ></div>
          
          {/* Mobile Vertical Line */}
          <div 
            className="md:hidden absolute top-0 bottom-0 left-9.75 w-0.5 bg-indigo-100 z-0" 
            aria-hidden="true"
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 relative z-10">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="relative flex flex-row md:flex-col items-start md:items-center group bg-white md:bg-transparent p-6 md:p-0 rounded-2xl shadow-sm md:shadow-none border border-slate-100 md:border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:hover:shadow-none"
              >
                {/* Icon Wrapper */}
                <div className="relative shrink-0 mb-0 md:mb-8 z-10">
                  {/* Outer Circle with Glow */}
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-100 border border-indigo-50 transition-all duration-500 group-hover:shadow-indigo-200 group-hover:scale-105 group-hover:border-indigo-200">
                    
                    {/* Inner Icon Container */}
                    <div  
                     className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 transition-all duration-500 ease-out group-hover:bg-linear-to-br group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white group-hover:scale-110"
                     >
                      {step.icon}
                    </div>

                  </div>
                  
                  {/* Step Number Badge */}
                  <div
                   className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-lg border-4 border-white transition-transform duration-500 group-hover:scale-110 group-hover:bg-purple-600"
                  
                  >
                    {step.id}
                  </div>
                </div>

                {/* Text Content */}
                <div className="ml-6 md:ml-0 text-left md:text-center mt-2 md:mt-0">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-indigo-600">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed max-w-sm mx-auto text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;

