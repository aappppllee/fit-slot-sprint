
import * as React from "react";
import { format, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TimeSlotProps } from "./TimeSlot";
import TimeSlot from "./TimeSlot";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// Generate time slots from 5am to 9pm with 2-hour intervals
const generateTimeSlots = (selectedDate: Date): TimeSlotProps[] => {
  const formattedDate = format(selectedDate, 'MMM dd, yyyy');
  const isToday = new Date().toDateString() === selectedDate.toDateString();
  const dateLabel = isToday ? "Today" : formattedDate;
  
  const slots = [];
  for (let hour = 5; hour <= 21; hour += 2) {
    const isPM = hour >= 12;
    const displayHour = hour > 12 ? hour - 12 : hour;
    const timeString = `${displayHour}:00 ${isPM ? 'PM' : 'AM'}`;
    
    // Randomly assign featured status to a couple of slots
    const featured = Math.random() < 0.2;
    
    // Randomly assign different prices based on time of day
    let price = 12.99;
    if (hour >= 17) { // Evening slots more expensive
      price = 16.99;
    } else if (hour >= 12) { // Afternoon slots medium price
      price = 14.99;
    }
    
    // Random available spots between 1-15
    const availableSpots = Math.floor(Math.random() * 15) + 1;
    
    slots.push({
      id: `${selectedDate.getTime()}-${hour}`,
      time: timeString,
      date: dateLabel,
      duration: "120 min",
      availableSpots,
      price,
      featured
    });
  }
  
  return slots;
};

const BookingCalendar = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = React.useState<Date>(new Date());
  const [sessionType, setSessionType] = React.useState("all");
  const [duration, setDuration] = React.useState("120");
  const [showCalendar, setShowCalendar] = React.useState(false);
  
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setShowCalendar(false);
    }
  };

  const handleTodayClick = () => {
    setDate(new Date());
    setShowCalendar(false);
  };

  const handleTomorrowClick = () => {
    const tomorrow = addDays(new Date(), 1);
    setDate(tomorrow);
    setShowCalendar(false);
  };

  const timeSlots = generateTimeSlots(date);
  const formattedDate = format(date, 'EEEE, MMMM do, yyyy');
  
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-4">Select Date</h3>
              <div className="flex flex-col space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant={new Date().toDateString() === date.toDateString() ? "default" : "outline"} 
                    onClick={handleTodayClick}
                  >
                    Today
                  </Button>
                  <Button 
                    variant={addDays(new Date(), 1).toDateString() === date.toDateString() ? "default" : "outline"} 
                    onClick={handleTomorrowClick}
                  >
                    Tomorrow
                  </Button>
                </div>
                
                <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Custom Date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      className="rounded-md border pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                
                <div className="text-center py-2 px-3 bg-gym-purple/10 rounded-md">
                  <p className="text-sm font-medium">{formattedDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-4">Filters</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Type</label>
                  <Select value={sessionType} onValueChange={setSessionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sessions</SelectItem>
                      <SelectItem value="gym">Open Gym</SelectItem>
                      <SelectItem value="personal">Personal Training</SelectItem>
                      <SelectItem value="group">Group Workout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="120">120 Minutes</SelectItem>
                      <SelectItem value="60">60 Minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Available Slots for {formattedDate}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {timeSlots.map((slot) => (
              <TimeSlot key={slot.id} {...slot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
