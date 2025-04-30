
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GymSearch from "@/components/GymSearch";
import GymList from "@/components/GymList";
import { Gym } from "@/types/gym";
import { mockGyms } from "@/data/mockGyms";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dumbbell, MapPin, Star } from "lucide-react";

const GymFinderPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gyms, setGyms] = useState<Gym[]>(mockGyms);
  const [filterType, setFilterType] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter gyms based on search query
    filterGyms(query, filterType);
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value);
    filterGyms(searchQuery, value);
  };

  const filterGyms = (query: string, filter: string | null) => {
    let filteredGyms = mockGyms;
    
    // Apply search query filter
    if (query) {
      filteredGyms = filteredGyms.filter(
        (gym) =>
          gym.name.toLowerCase().includes(query.toLowerCase()) ||
          gym.location.address.toLowerCase().includes(query.toLowerCase()) ||
          gym.location.city.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply additional filters
    if (filter) {
      switch (filter) {
        case "popular":
          filteredGyms = filteredGyms.sort((a, b) => b.rating - a.rating);
          break;
        case "nearest":
          // In a real app, this would use geolocation to sort by distance
          filteredGyms = filteredGyms.sort((a, b) => 
            a.location.city.localeCompare(b.location.city)
          );
          break;
        default:
          break;
      }
    }
    
    setGyms(filteredGyms);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6 md:py-10">
        <div className="container mx-auto px-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Find a Gym Near You</h1>
          <p className="text-gray-600 text-sm md:text-base mb-4">
            Search for partner gyms in your area and book your workout slots.
          </p>
          
          <GymSearch onSearch={handleSearch} />
          
          <div className="mt-4">
            <h2 className="text-sm font-medium mb-2">Filter Gyms By:</h2>
            <ToggleGroup type="single" value={filterType || ""} onValueChange={handleFilterChange}>
              <ToggleGroupItem value="popular" aria-label="Sort by popularity">
                <Star className="h-4 w-4 mr-1" /> Popular
              </ToggleGroupItem>
              <ToggleGroupItem value="nearest" aria-label="Sort by nearest">
                <MapPin className="h-4 w-4 mr-1" /> Nearest
              </ToggleGroupItem>
              <ToggleGroupItem value="all" aria-label="View all gyms">
                <Dumbbell className="h-4 w-4 mr-1" /> All Gyms
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        
        <GymList gyms={gyms} />
      </main>
      
      <Footer />
    </div>
  );
};

export default GymFinderPage;
