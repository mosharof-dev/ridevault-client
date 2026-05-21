"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Form, Modal, TextArea } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiCalendarCheckLine, RiCloseLine } from "react-icons/ri";

const BookingModal = ({ car, isAvailable, dailyPrice }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize Next.js router

  // Auth Context Session Parsing
  const session = authClient.useSession?.() || {};
  const userEmail = session?.data?.user?.email;

  const inputStyles =
    "w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm text-[15px] outline-none text-slate-700";

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const driverNeeded = formData.get("driverNeeded");
    const specialNote = formData.get("specialNote");

    const bookingPayload = {
      carId: car._id,
      carName: car.carModel,  
      image: car.image,       
      category: car.category, 
      location: car.location, 
      
      
      userEmail: userEmail,
      driverNeeded: driverNeeded === "Yes",
      specialNote,
      totalPrice: Number(dailyPrice),
      bookingTime: new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    const tokenResponse = await authClient.token();
    const actualToken = tokenResponse?.data?.token || tokenResponse?.token;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${actualToken}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      if (res.ok) {
        toast.success("Booking Successful! 🎉");
        router.push("/my-bookings"); // Redirect to My Bookings page
      } else {
        toast.error("Failed to process booking.");
      }
    } catch (error) {
      toast.error("Server error occurred.");
    } finally {
      setLoading(false);
    }
  };
if (!isAvailable) {
    return (
      <Button
        disabled
        className="w-full py-6 rounded-xl font-bold text-lg bg-slate-200 text-slate-500 cursor-not-allowed"
      >
        Currently Reserved
      </Button>
    );
  }
  return (
    <Modal>
      {/* Trigger CTA */}
      <Button
        disabled={!isAvailable}
        className={`w-full py-6 rounded-xl font-bold text-lg transition-all shadow-md ${
          isAvailable
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer hover:shadow-xl hover:scale-[1.02]"
            : "bg-slate-200 text-slate-500 disabled:cursor-not-allowed"
        }`}
      >
        {isAvailable ? "Book This Ride Now →" : "Currently Reserved"}
      </Button>

      {/* Backdrop */}
      <Modal.Backdrop className="bg-slate-900/60 backdrop-blur-sm z-50">
        <Modal.Container className="items-center justify-center p-4">
          <Modal.Dialog className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden text-slate-800">
            <Modal.CloseTrigger className="absolute top-3 right-3 p-1.5 bg-black/40 text-white rounded-full hover:bg-rose-500 transition-colors cursor-pointer z-10">
              <RiCloseLine className="text-xl" />
            </Modal.CloseTrigger>

            <Form onSubmit={handleBooking} className="w-full">
              {/* Premium Image Header */}
              <Modal.Header className="p-0 border-b border-slate-100 flex flex-col relative">
                <div className="h-40 w-full relative">
                  <Image
                    src={car?.image}
                    alt={car?.carModel}
                    fill
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-5">
                    <h3 className="text-white text-2xl font-bold">
                      {car?.carModel || "Selected Car"}
                    </h3>
                  </div>
                </div>
                <div className="p-5 flex justify-between items-center w-full bg-white">
                  <Modal.Heading className="text-lg font-bold text-slate-800">
                    Booking Details
                  </Modal.Heading>
                  <span className="text-sm text-indigo-700 font-bold bg-indigo-50 px-3 py-1.5 rounded-lg shadow-sm border border-indigo-100">
                    ${dailyPrice} / day
                  </span>
                </div>
              </Modal.Header>

              {/* Body */}
              <Modal.Body className="px-6 py-4 space-y-5 bg-slate-50/30">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Personal Driver
                  </label>
                  <select
                    name="driverNeeded"
                    required
                    className={`${inputStyles} cursor-pointer `}
                  >
                    <option value="No">No, I&apos;ll Drive Myself</option>
                    <option value="Yes">Yes, Include Professional Driver</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Special Instructions
                  </label>
                  <TextArea
                    name="specialNote"
                    placeholder="Child seats, specific pickup point..."
                    className="w-full h-24 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition-all shadow-sm text-[15px]"
                    
                  />
                </div>
              </Modal.Body>

              {/* Footer */}
              <Modal.Footer className="p-6 bg-white border-t border-slate-100 flex justify-end gap-3 rounded-b-2xl">
                <Button
                  slot="close"
                  type="button"
                  className="bg-slate-100 text-slate-600 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={loading}
                  className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RiCalendarCheckLine className="text-xl" />
                  {loading ? "Processing..." : "Confirm Booking"}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default BookingModal;