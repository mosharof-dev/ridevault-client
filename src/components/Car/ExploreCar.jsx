import Image from "next/image";
import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";

const ExploreCar = ({ car, viewType, getCategoryColor }) => {
  return (
    <div
      key={car._id}
      className={`flex h-full border border-slate-100 hover:border-indigo-200 bg-white hover:shadow-2xl hover:shadow-indigo-100/40 hover:-translate-y-1 transition-all duration-300 rounded-3xl overflow-hidden
                  ${viewType === "list" ? "flex-col md:flex-row" : "flex-col"}
                `}
    >
      {/* Car Image Area */}
      <div
        className={`relative overflow-hidden group shrink-0
                  ${viewType === "list" ? "w-full md:w-80 h-56 md:h-auto min-h-55" : "w-full h-56"}
                `}
      >
        <Image
          src={
            car.image ||
            "https://images.unsplash.com/photo-1541443131876-44b03de101b5?q=80&w=600"
          }
          alt={car.carModel}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category Chip (Dynamic Color) */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className={`${getCategoryColor(car.category)} text-white font-extrabold text-xs shadow-md px-3 py-1.5 rounded-full`}
          >
            {car.category}
          </span>
        </div>
        {/* Availability Chip */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className={`text-white font-bold text-xs shadow-md px-3 py-1.5 rounded-full ${car.availability ? "bg-emerald-500" : "bg-red-500"}`}
          >
            {car.availability ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        {/* Upore model, description and features  */}
        <div className="flex-1">
          {/* Model & Location */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight line-clamp-1">
              {car.carModel}
            </h2>
            <div className="flex items-center text-slate-500 text-xs font-semibold whitespace-nowrap bg-slate-100 px-2.5 py-1 rounded-lg">
              <HiOutlineLocationMarker className="mr-1 text-sm text-indigo-500" />
              {car.location}
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
            {car.description}
          </p>

          {/* Features List */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {car.features &&
              car.features.slice(0, 2).map((feat, i) => (
                <span
                  key={i}
                  className="bg-indigo-50/50 text-indigo-600 border border-indigo-100/50 text-[11px] font-bold px-2.5 py-1 rounded-lg"
                >
                  {feat}
                </span>
              ))}
            {car.features && car.features.length > 2 && (
              <span className="bg-slate-50 text-slate-500 border border-slate-200/40 text-[11px] font-bold px-2 py-1 rounded-lg">
                +{car.features.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Button Footer  */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Daily Rate
            </p>
            <p className="text-2xl font-black text-indigo-600">
              ${car.dailyRentalPrice}
              <span className="text-slate-500 text-sm font-semibold">/day</span>
            </p>
          </div>

          <Link href={`/explore-cars/${car._id}`}
          className="bg-linear-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-extrabold rounded-xl px-5 lg:px-6 py-2.5 shadow-md shadow-indigo-100 active:scale-[0.98] transition-all whitespace-nowrap text-sm"
        >
            
              View Details
           
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreCar;
