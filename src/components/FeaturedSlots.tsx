
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TimeSlot from "./TimeSlot";
import { supabase } from "@/integrations/supabase/client";

const FeaturedSlots = () => {
  const [slots, setSlots] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("time_slots")
        .select("*, gyms(name)")
        .eq("featured", true)
        .gte("date", today)
        .gt("available_spots", 0)
        .limit(4);
      
      if (data) setSlots(data as any[]);
    };
    fetchFeatured();
  }, []);

  if (slots.length === 0) return null;

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Time Slots</h2>
          <Link to="/book">
            <Button variant="outline" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {slots.map((slot: any) => (
            <TimeSlot
              key={slot.id}
              id={slot.id}
              time={slot.start_time}
              date={slot.date}
              duration={`${slot.duration_minutes} min`}
              availableSpots={slot.available_spots}
              price={Number(slot.price)}
              featured={slot.featured}
              gymId={slot.gym_id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlots;
