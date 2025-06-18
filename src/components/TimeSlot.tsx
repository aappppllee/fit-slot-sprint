
import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface TimeSlotProps {
  id: string;
  time: string;
  date: string;
  duration: string;
  availableSpots: number;
  price: number;
  featured?: boolean;
  gymId?: string;
}

const TimeSlot = ({ id, time, date, duration, availableSpots, price, featured = false, gymId }: TimeSlotProps) => {
  return (
    <div 
      className={`rounded-lg bg-white p-5 card-shadow ${
        featured 
          ? "border-2 border-gym-purple relative" 
          : "border border-gray-100"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 right-4 bg-gym-purple text-white px-3 py-1 rounded-full text-xs font-medium">
          Popular
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-lg font-bold">{time}</h3>
        <p className="text-gray-600">{date}</p>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gym-purple mr-2" />
          <span className="text-sm text-gray-700">{duration}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 text-gym-purple mr-2" />
          <span className="text-sm text-gray-700">{availableSpots} spots available</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <span className="font-bold text-lg">₹{price.toFixed(2)}</span>
        <Link to={`/checkout/${id}`}>
          <Button>Book Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default TimeSlot;
