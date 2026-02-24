
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GymSearch from "@/components/GymSearch";
import GymList from "@/components/GymList";
import { Gym } from "@/types/gym";
import { supabase } from "@/integrations/supabase/client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dumbbell, MapPin, Star } from "lucide-react";

const GymFinderPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string | null>(null);

  const fetchGyms = async (query?: string) => {
    setLoading(true);
    let q = supabase
      .from("gyms")
      .select("*")
      .eq("status", "approved");

    if (query && query !== "Current Location") {
      q = q.or(`name.ilike.%${query}%,city.ilike.%${query}%,zip_code.ilike.%${query}%,address.ilike.%${query}%`);
    }

    const { data, error } = await q;
    if (!error && data) {
      let results = data as unknown as Gym[];
      if (filterType === "popular") {
        results = results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }
      setGyms(results);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGyms();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchGyms(query);
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value);
    // Re-sort existing results
    if (value === "popular") {
      setGyms(prev => [...prev].sort((a, b) => (b.rating || 0) - (a.rating || 0)));
    } else {
      fetchGyms(searchQuery);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6 md:py-10">
        <div className="container mx-auto px-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Find a Gym Near You</h1>
          <p className="text-muted-foreground text-sm md:text-base mb-4">
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
        
        {loading ? (
          <div className="text-center py-10 text-muted-foreground">Loading gyms...</div>
        ) : (
          <GymList gyms={gyms} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default GymFinderPage;
