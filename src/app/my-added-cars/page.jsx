"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaMapMarkerAlt, FaCar, FaPlus } from "react-icons/fa";
import Loading from "../loading";
import EditModal from "@/components/Car/EditModal";
import Delete from "@/components/Car/Delete";

export default function MyCarsPage() {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCars = async () => {
      try {
        const tokenResponse = await authClient.token();
        const actualToken = tokenResponse?.data?.token || tokenResponse?.token;

        const res = await fetch("http://localhost:5000/my-cars", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${actualToken}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setMyCars(data);
        } else {
          console.error("Backend server error status:", res.status);
        }
      } catch (err) {
        console.error("Fetch client fail:", err);
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, []);

  if (loading) return <Loading />;

  // Homepage color guide match:
  const getCategoryColor = (catName) => {
    const name = catName?.toLowerCase() || "";
    if (name === "sedan") return "bg-blue-600 text-white";
    if (name === "suv") return "bg-indigo-600 text-white";
    if (name === "luxury") return "bg-amber-500 text-slate-900";
    if (name === "hatchback") return "bg-pink-600 text-white";
    return "bg-slate-900 text-white";
  };

  return (
    <div className="container mx-auto p-4 md:p-8   bg-white">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            My Added Cars
            <span className="text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full">
              {myCars.length} {myCars.length === 1 ? "Car" : "Cars"}
            </span>
          </h1>
          <p className="text-slate-500 text-sm mt-1.5">
            Manage and track your listed vehicles in RideVault
          </p>
        </div>

        {/* Homepage exact button theme match  */}
        {myCars.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Go Home Button (Secondary Outlined Style) */}
            <Link href="/" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-2 border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold py-3 px-5 rounded-xl transition-all shadow-sm">
                Go Home
              </button>
            </Link>

            {/* Add Another Car Button  */}
            <Link href="/add-car" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-3 px-5 rounded-xl transition-all shadow-sm">
                <FaPlus className="text-xs" /> Add Another Car
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Conditional Rendering */}
      {myCars.length === 0 ? (
        /*  Homepage Branded */
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 container mx-auto my-12">
          <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 mb-5 text-blue-600">
            <FaCar className="text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            No Cars Added Yet
          </h3>
          <p className="text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
            You haven&apos;t listed any vehicles for rent. Add your first car to
            start earning with RideVault.
          </p>
          <Link href="/add-car">
            <button className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-95 text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all shadow-md shadow-blue-100">
              <FaPlus className="text-xs" /> Add Your First Car
            </button>
          </Link>
        </div>
      ) : (
        /* VERTICAL LIST CARDS - Styled like Homepage "Featured Vehicles" */
        <div className="flex flex-col gap-8">
          {myCars.map((car) => (
            <div
              key={car._id}
              className="flex flex-col lg:flex-row border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md bg-white transition-all p-3 lg:p-0 gap-5 lg:gap-0"
            >
              {/* Left Side: Image Layout */}
              <div className="relative w-full lg:w-90 h-56 lg:h-auto min-h-55 bg-slate-50 shrink-0 rounded-xl lg:rounded-none overflow-hidden">
                <Image
                  src={
                    car.image ||
                    "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?q=80&w=687"
                  }
                  alt={car.carModel}
                  fill
                  className="w-full h-full object-cover"
                />

                {/* Category Badge - Homepage Style */}
                <span
                  className={`absolute top-4 left-4 ${getCategoryColor(car.category)} font-black text-[10px] tracking-wider shadow-sm px-2.5 py-1 rounded-md uppercase`}
                >
                  {car.category || "Standard"}
                </span>

                {/* Availability Badge - Clean Teal Accent */}
                <span
                  className={`absolute top-4 right-4 text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider ${
                    car.availability === true ||
                    car.availability === "Available"
                      ? "bg-emerald-500 text-white"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  {car.availability === true || car.availability === "Available"
                    ? "Available"
                    : "Unavailable"}
                </span>
              </div>

              {/* Right Side: Content & Details Section */}
              <div className="p-2 lg:p-7 flex flex-col grow justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {car.carModel}
                    </h3>
                    <span className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded-md">
                      <FaMapMarkerAlt className="text-blue-500" />{" "}
                      {car.location}
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm md:text-base line-clamp-2 mb-5 leading-relaxed">
                    {car.description}
                  </p>

                  {/* Features Row  */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {car.features && Array.isArray(car.features) ? (
                      car.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-indigo-50/50 text-indigo-600 border border-indigo-100/50 text-[11px] font-bold px-2.5 py-1 rounded-lg"
                        >
                          {feature}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="text-xs bg-slate-50 text-slate-600 border border-slate-200/60 font-medium px-3 py-1 rounded-md">
                          GPS
                        </span>
                        <span className="text-xs bg-slate-50 text-slate-600 border border-slate-200/60 font-medium px-3 py-1 rounded-md">
                          Bluetooth
                        </span>
                        <span className="text-xs bg-slate-50 text-slate-600 border border-slate-200/60 font-medium px-3 py-1 rounded-md">
                          +{car.seatCapacity || 5} Seats
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom Row - Pricing matching homepage colors */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-2">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest block">
                      Daily Rate
                    </span>
                    <p className="text-2xl font-black text-indigo-500">
                      ${car.dailyRentalPrice}
                      <span className="text-xs font-normal text-slate-500 tracking-normal">
                        /day
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons: Update and Delete */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Update Button */}
                    <EditModal car={car} setMyCars={setMyCars} />

                    {/* Delete Button */}
                    <Delete car={car} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
