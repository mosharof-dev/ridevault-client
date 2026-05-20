"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Input,
  Label,
  Modal,
  TextField,
  TextArea,
  Form,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { RiSaveLine } from "react-icons/ri";

const EditModal = ({ car, setMyCars }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Reusable premium indigo/slate inputs style
  const inputStyles =
    "w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all shadow-sm text-[15px] outline-none text-slate-700";

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const updatedData = Object.fromEntries(formData.entries());

      // Features list array mapping
      if (updatedData.features) {
        updatedData.features = updatedData.features
          .split(",")
          .map((f) => f.trim());
      }

      // Types fixed for calculations
      updatedData.dailyRentalPrice = Number(updatedData.dailyRentalPrice);
      updatedData.seatCapacity = Number(updatedData.seatCapacity);

      const tokenResponse = await authClient.token();
      const actualToken = tokenResponse?.data?.token || tokenResponse?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-cars/${car._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${actualToken}`,
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (res.ok) {
        //   setMyCars update proper wrapper call dynamic execution
        setMyCars((prevCars) =>
          prevCars.map((c) =>
            c._id === car._id ? { ...c, ...updatedData } : c,
          ),
        );

        toast.success("Car updated successfully!");
        setIsOpen(false);
      } else {
        toast.error("Failed to update car details.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    //  Passed controlled modal state parameter rules
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        onPress={() => setIsOpen(true)} // Open trigger action execution
        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-sm py-2 px-4 rounded-xl transition-all border border-indigo-100 flex items-center gap-1.5"
      >
        <CiEdit className="w-4 h-4 stroke-[0.5]" />
        Edit
      </Button>

      <Modal.Backdrop className="z-999">
        <Modal.Container placement="auto" className="z-999">
          <Modal.Dialog className="max-w-2xl w-full bg-white p-0 overflow-y-auto max-h-[90vh] shadow-2xl rounded-2xl relative">
            <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6">
              <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col">
                {/*  Header & Description  */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 md:px-8 py-5 border-b border-slate-100 flex justify-between items-center z-10">
                  <div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                      Edit Vehicle Specifications
                    </h2>
                    <p className="text-xs md:text-sm text-indigo-600 font-medium bg-indigo-50/70 px-2.5 py-1 rounded-md inline-block mt-1">
                      🔧 Update live pricing, layout details, or availability
                      for: <span className="font-bold">{car.carModel}</span>
                    </p>
                  </div>
                  <Button
                    onPress={() => setIsOpen(false)}
                    className="p-2 bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600 rounded-full transition-colors font-bold text-xs"
                  >
                    ✕
                  </Button>
                </div>

                {/* Modal Body / Form */}
                <div className="p-6 md:p-8 overflow-y-auto">
                  <Form
                    onSubmit={onSubmit}
                    validationBehavior="native"
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                      <TextField
                        name="carModel"
                        isRequired
                        className="flex flex-col gap-1.5"
                        defaultValue={car.carModel}
                      >
                        <Label className="text-[14px] font-bold text-slate-700">
                          Car Model
                        </Label>
                        <Input
                          placeholder="Enter model name"
                          className={inputStyles}
                        />
                        <FieldError className="text-red-500 text-xs font-bold mt-1" />
                      </TextField>

                      <TextField
                        name="dailyRentalPrice"
                        type="number"
                        isRequired
                        className="flex flex-col gap-1.5"
                        defaultValue={car.dailyRentalPrice}
                      >
                        <Label className="text-[14px] font-bold text-slate-700">
                          Daily Rate ($)
                        </Label>
                        <Input
                          placeholder="Rental price per day"
                          className={inputStyles}
                        />
                        <FieldError className="text-red-500 text-xs font-bold mt-1" />
                      </TextField>

                      <TextField
                        name="seatCapacity"
                        type="number"
                        isRequired
                        className="flex flex-col gap-1.5"
                        defaultValue={car.seatCapacity}
                      >
                        <Label className="text-[14px] font-bold text-slate-700">
                          Seat Capacity
                        </Label>
                        <Input
                          placeholder="Number of seats"
                          className={inputStyles}
                        />
                        <FieldError className="text-red-500 text-xs font-bold mt-1" />
                      </TextField>

                      <TextField
                        name="location"
                        isRequired
                        className="flex flex-col gap-1.5"
                        defaultValue={car.location}
                      >
                        <Label className="text-[14px] font-bold text-slate-700">
                          Pickup Location
                        </Label>
                        <Input
                          placeholder="City or area"
                          className={inputStyles}
                        />
                        <FieldError className="text-red-500 text-xs font-bold mt-1" />
                      </TextField>

                      <TextField
                        name="image"
                        type="url"
                        isRequired
                        className="flex flex-col gap-1.5"
                        defaultValue={car.image}
                      >
                        <Label className="text-[14px] font-bold text-slate-700">
                          Image URL
                        </Label>
                        <Input
                          placeholder="Valid image URL"
                          className={inputStyles}
                        />
                        <FieldError className="text-red-500 text-xs font-bold mt-1" />
                      </TextField>

                      <TextField
                        name="features"
                        isRequired
                        className="flex flex-col gap-1.5"
                        defaultValue={
                          Array.isArray(car.features)
                            ? car.features.join(", ")
                            : car.features
                        }
                      >
                        <Label className="text-[14px] font-bold text-slate-700">
                          Features
                        </Label>
                        <Input
                          placeholder="GPS, AC, Leather Seats"
                          className={inputStyles}
                        />
                        <FieldError className="text-red-500 text-xs font-bold mt-1" />
                      </TextField>

                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[14px] font-bold text-slate-700">
                          Category
                        </label>
                        <select
                          name="category"
                          required
                          defaultValue={car.category}
                          className={`${inputStyles} cursor-pointer`}
                        >
                          <option value="Sedan">Sedan</option>
                          <option value="SUV">SUV</option>
                          <option value="Hatchback">Hatchback</option>
                          <option value="Luxury">Luxury</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[14px] font-bold text-slate-700">
                          Availability Status
                        </label>
                        <select
                          name="availability"
                          required
                          defaultValue={
                            car.availability === true ||
                            car.availability === "Available"
                              ? "Available"
                              : "Unavailable"
                          }
                          className={`${inputStyles} cursor-pointer`}
                        >
                          <option value="Available">
                            Available Immediately
                          </option>
                          <option value="Unavailable">
                            Currently Unavailable
                          </option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <TextField
                          name="description"
                          defaultValue={car.description}
                          isRequired
                          className="flex flex-col gap-1.5"
                        >
                          <Label className="text-[14px] font-bold text-slate-700">
                            Description
                          </Label>
                          <TextArea
                            placeholder="Detailed vehicle logs..."
                            className="w-full min-h-25 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-[15px] outline-none text-slate-700 resize-none"
                          />
                          <FieldError className="text-red-500 text-xs font-bold mt-1" />
                        </TextField>
                      </div>
                    </div>

                    {/* Actions panel aligning with platform theme */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100 mt-4">
                      <Button
                        type="button"
                        onPress={() => setIsOpen(false)}
                        className="w-full sm:w-auto bg-slate-100 text-slate-600 font-bold rounded-xl px-6 h-12 hover:bg-slate-200 transition-all"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        isLoading={loading}
                        className="w-full sm:w-auto bg-indigo-600 text-white font-bold rounded-xl px-8 h-12 shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                      >
                        <RiSaveLine className="text-lg" />
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditModal;
