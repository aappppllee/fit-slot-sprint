
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TimeSlot, { TimeSlotProps } from "./TimeSlot";

const featuredTimeSlots: TimeSlotProps[] = [
  {
    id: "1",
    time: "7:00 AM",
    date: "Today",
    duration: "60 min",
    availableSpots: 8,
    price: 149
  },
  {
    id: "2",
    time: "9:00 AM",
    date: "Today",
    duration: "60 min",
    availableSpots: 5,
    price: 149,
    featured: true
  },
  {
    id: "3",
    time: "5:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 2,
    price: 199,
    featured: true
  },
  {
    id: "4",
    time: "7:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 6,
    price: 199
  }
];

const FeaturedSlots = () => {
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
          {featuredTimeSlots.map((slot) => (
            <TimeSlot key={slot.id} {...slot} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlots;
