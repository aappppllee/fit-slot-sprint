
import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  const location = useLocation();
  const { toast } = useToast();
  const isBookPage = location.pathname === "/book";

  const handleBookSlot = () => {
    toast({
      title: "🎉 Slot Successfully Booked!",
      description: `Your slot at ${time} on ${date} has been booked.`,
    });
  };

  return (
    <div 
      className={`rounded-lg bg-card p-5 card-shadow ${
        featured 
          ? "border-2 border-primary relative" 
          : "border border-border"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
          Popular
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-lg font-bold">{time}</h3>
        <p className="text-muted-foreground">{date}</p>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-primary mr-2" />
          <span className="text-sm text-muted-foreground">{duration}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 text-primary mr-2" />
          <span className="text-sm text-muted-foreground">{availableSpots} spots available</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <span className="font-bold text-lg">₹{price.toFixed(0)}</span>
        {isBookPage ? (
          <Button onClick={handleBookSlot}>Book Slot</Button>
        ) : (
          <Link to="/find-gym">
            <Button>Book Now</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TimeSlot;
