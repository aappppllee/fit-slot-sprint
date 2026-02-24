
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCalendar from "@/components/BookingCalendar";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockGyms } from "@/data/mockGyms";
import { Gym } from "@/types/gym";
import { useAuth } from "@/hooks/useAuth";

const BookPage = () => {
  const [searchParams] = useSearchParams();
  const gymId = searchParams.get("gymId");
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const isMobile = useIsMobile();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/gym-user-auth");
    }
  }, [user, loading, navigate]);
  
  useEffect(() => {
    if (gymId) {
      const gym = mockGyms.find(g => g.id === gymId) || null;
      setSelectedGym(gym);
    }
  }, [gymId]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6 md:py-10">
        <div className="container mx-auto px-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            Book a Gym Slot {selectedGym ? `at ${selectedGym.name}` : ""}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Select a date and time that works for you.
          </p>
        </div>
        
        <BookingCalendar gymId={gymId || undefined} />
      </main>
      
      <Footer />
    </div>
  );
};

export default BookPage;
