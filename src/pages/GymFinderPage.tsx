
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GymSearch from "@/components/GymSearch";
import GymList from "@/components/GymList";
import { Gym } from "@/types/gym";
import { mockGyms } from "@/data/mockGyms";

const GymFinderPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gyms, setGyms] = useState<Gym[]>(mockGyms);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter gyms based on search query
    const filteredGyms = mockGyms.filter(
      (gym) =>
        gym.name.toLowerCase().includes(query.toLowerCase()) ||
        gym.location.address.toLowerCase().includes(query.toLowerCase()) ||
        gym.location.city.toLowerCase().includes(query.toLowerCase())
    );
    setGyms(filteredGyms);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6 md:py-10">
        <div className="container mx-auto px-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Find a Gym Near You</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Search for partner gyms in your area and book your workout slots.
          </p>
          
          <GymSearch onSearch={handleSearch} />
        </div>
        
        <GymList gyms={gyms} />
      </main>
      
      <Footer />
    </div>
  );
};

export default GymFinderPage;
