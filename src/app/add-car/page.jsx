"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
  TextArea,
  Form,
} from "@heroui/react";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { RiDeleteBin5Line, RiSaveLine } from "react-icons/ri";
import Loading from "../loading";

const AddCarPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!session?.user?.email) {
      toast.error("You must be logged in to add a car.");
      return;
    }

    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const rawCarData = Object.fromEntries(formData.entries());

    const carData = {
      ...rawCarData,
      dailyRentalPrice: Number(rawCarData.dailyRentalPrice),
      availability: rawCarData.availability === "Available",
      features: rawCarData.features.split(",").map((f) => f.trim()),
      bookingCount: 0,
      addedByEmail: session.user.email,
    };

    console.log("🟢 Submit Data Object:", carData);

    setTimeout(() => {
      setLoading(false);
      toast.success("Vehicle successfully added to fleet!");
      event.target.reset();
    }, 1500);
  };

  const inputStyles =
    "h-13 w-full rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all px-4 shadow-sm text-[15px] outline-none text-slate-700";

  return (
    <div className=" bg-slate-50 py-12   flex justify-center font-sans">
      <div className="w-full container  mx-auto px-4  sm:px-6 lg:px-8 relative z-10">
        <div className="bg-linear-to-r from-indigo-600 to-teal-500 p-10 rounded-t-3xl shadow-md text-white">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            Add New Vehicle
          </h1>
          <p className="text-indigo-100 text-[15px] font-medium leading-relaxed max-w-2xl">
            Expand the RideVault fleet. Provide accurate pricing, clear
            features, and detailed information to attract customers and increase
            your bookings.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 md:p-12 rounded-b-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <Form
            onSubmit={onSubmit}
            validationBehavior="native"
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Car Model */}
              <TextField
                name="carModel"
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-[14px] font-bold text-slate-700">
                  Car Model
                </Label>
                <Input
                  placeholder="Enter the car model name"
                  className={inputStyles}
                />
                <FieldError className="text-red-500 text-xs font-bold mt-1" />
              </TextField>

              {/* Daily Rental Price */}
              <TextField
                name="dailyRentalPrice"
                type="number"
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-[14px] font-bold text-slate-700">
                  Daily Rental Price ($)
                </Label>
                <Input
                  type="number"
                  placeholder="Enter rental price per day in USD"
                  className={inputStyles}
                />
                <FieldError className="text-red-500 text-xs font-bold mt-1" />
              </TextField>

              {/* Registration Number */}
              <TextField
                name="vehicleRegistrationNumber"
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-[14px] font-bold text-slate-700">
                  Registration Number
                </Label>
                <Input
                  placeholder="Enter official vehicle registration number"
                  className={inputStyles}
                />
                <FieldError className="text-red-500 text-xs font-bold mt-1" />
              </TextField>

              {/* Pickup Location */}
              <TextField
                name="location"
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-[14px] font-bold text-slate-700">
                  Pickup Location
                </Label>
                <Input
                  placeholder="Enter city or pickup area name"
                  className={inputStyles}
                />
                <FieldError className="text-red-500 text-xs font-bold mt-1" />
              </TextField>

              {/* Image URL */}
              <TextField
                name="image"
                type="url"
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-[14px] font-bold text-slate-700">
                  Image URL
                </Label>
                <Input
                  type="url"
                  placeholder="Enter a valid image URL"
                  className={inputStyles}
                />
                <FieldError className="text-red-500 text-xs font-bold mt-1" />
              </TextField>

              {/* Features */}
              <TextField
                name="features"
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-[14px] font-bold text-slate-700">
                  Features
                </Label>
                <Input
                  placeholder="Enter car features (comma-separated)"
                  className={inputStyles}
                />
                <FieldError className="text-red-500 text-xs font-bold mt-1" />
              </TextField>

              {/* Category Select (Native) */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[14px] font-bold text-slate-700">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    required
                    defaultValue=""
                    className={`${inputStyles} appearance-none cursor-pointer pr-10`}
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Availability Select (Native) */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[14px] font-bold text-slate-700">
                  Availability Status
                </label>
                <div className="relative">
                  <select
                    name="availability"
                    required
                    defaultValue="Available"
                    className={`${inputStyles} appearance-none cursor-pointer pr-10`}
                  >
                    <option value="Available">Available Immediately</option>
                    <option value="Unavailable">Currently Unavailable</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <TextField
                  name="description"
                  isRequired
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-[14px] font-bold text-slate-700">
                    Description
                  </Label>
                  <TextArea
                    placeholder="Provide a detailed description of the vehicle, highlighting comfort, condition, and special notes."
                    className="w-full min-h-30 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all p-4 shadow-sm text-[15px] outline-none text-slate-700 resize-none"
                  />
                  <FieldError className="text-red-500 text-xs font-bold mt-1" />
                </TextField>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-6 border-t border-slate-100 mt-4">
              <Button
                type="reset"
                className="w-full sm:w-auto bg-red-50 text-red-600 border border-red-100 font-bold rounded-xl px-6 md:px-8 h-12 hover:bg-red-100 transition-all"
              >
                <RiDeleteBin5Line className="mr-1 text-lg" />
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={loading}
                className="w-full sm:w-auto bg-linear-to-r from-indigo-600 to-teal-500 text-white font-bold rounded-xl px-6 md:px-10 h-12 shadow-md shadow-indigo-200 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <RiSaveLine className="mr-1 text-lg" />
                {loading ? "Saving..." : "Add to Fleet"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddCarPage;
