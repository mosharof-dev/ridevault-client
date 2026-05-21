import React from "react";
import ExploreCarsClient from "@/components/Car/ExploreCarsClient";

export const metadata = {
  title: "Explore Cars | RideVault",
  description: "Find the perfect ride for your next journey.",
};

export default async function ExploreCarPage() {
  let initialCars = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/car`, {
      next: { revalidate: 300 } // Cache the initial list for 5 minutes
    });
    if (res.ok) {
      initialCars = await res.json();
    }
  } catch (error) {
    console.error("SSR Fetch Error for explore-cars:", error);
  }

  return <ExploreCarsClient initialCars={initialCars} />;
}