
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface GymSearchProps {
  onSearch: (query: string) => void;
}

const GymSearch = ({ onSearch }: GymSearchProps) => {
  const [query, setQuery] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // In a real app, you would send these coordinates to your backend
        // and find gyms within a certain radius
        // For now, we'll just set a placeholder query
        setQuery("Current Location");
        onSearch("Current Location");
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please search manually.");
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="my-6">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 md:flex-row md:items-center"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by location, gym name, or pin code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={getUserLocation}
            disabled={isLocating}
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            {isLocating ? "Locating..." : "Use My Location"}
          </Button>
          
          <Button type="submit">Search</Button>
        </div>
      </form>
    </div>
  );
};

export default GymSearch;
