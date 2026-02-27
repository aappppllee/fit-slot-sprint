
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TimeSlot, { TimeSlotProps } from "./TimeSlot";
import { mockGyms } from "@/data/mockGyms";

interface FeaturedSlotWithGym extends TimeSlotProps {
  gymName: string;
  gymCity: string;
}

const featuredTimeSlots: FeaturedSlotWithGym[] = [
  {
    id: "1",
    time: "7:00 AM",
    date: "Today",
    duration: "60 min",
    availableSpots: 8,
    price: 199,
    gymId: "gym-001",
    gymName: "FitZone Elite",
    gymCity: "Mumbai",
  },
  {
    id: "2",
    time: "9:00 AM",
    date: "Today",
    duration: "60 min",
    availableSpots: 5,
    price: 149,
    featured: true,
    gymId: "gym-002",
    gymName: "PowerLift Gym",
    gymCity: "Delhi",
  },
  {
    id: "3",
    time: "5:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 2,
    price: 249,
    featured: true,
    gymId: "gym-003",
    gymName: "Flex Fitness Studio",
    gymCity: "Bangalore",
  },
  {
    id: "4",
    time: "7:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 6,
    price: 179,
    gymId: "gym-005",
    gymName: "CrossTrain Revolution",
    gymCity: "Hyderabad",
  }
];

const FeaturedSlots = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Time Slots</h2>
          <Link to="/find-gym">
            <Button variant="outline" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTimeSlots.map((slot) => (
            <div key={slot.id} className="space-y-0">
              <div className="bg-primary/5 border border-border rounded-t-lg px-4 py-2 flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground">{slot.gymName}</span>
                <span className="text-xs text-muted-foreground">{slot.gymCity}</span>
              </div>
              <div className="[&>div]:rounded-t-none">
                <TimeSlot {...slot} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlots;
