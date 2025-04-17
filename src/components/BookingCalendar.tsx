
import * as React from "react";
import { format } from "date-fns";
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

const timeSlots: TimeSlotProps[] = [
  {
    id: "1",
    time: "7:00 AM",
    date: "Today",
    duration: "60 min",
    availableSpots: 8,
    price: 12.99
  },
  {
    id: "2",
    time: "9:00 AM",
    date: "Today",
    duration: "60 min",
    availableSpots: 5,
    price: 12.99,
    featured: true
  },
  {
    id: "3",
    time: "11:00 AM",
    date: "Today",
    duration: "60 min",
    availableSpots: 10,
    price: 12.99
  },
  {
    id: "4",
    time: "1:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 7,
    price: 14.99
  },
  {
    id: "5",
    time: "3:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 3,
    price: 14.99
  },
  {
    id: "6",
    time: "5:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 2,
    price: 16.99,
    featured: true
  },
  {
    id: "7",
    time: "7:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 6,
    price: 16.99
  },
  {
    id: "8",
    time: "9:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 12,
    price: 12.99
  }
];

const BookingCalendar = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [sessionType, setSessionType] = React.useState("all");
  const [duration, setDuration] = React.useState("60");

  const formattedDate = format(date, 'EEEE, MMMM do, yyyy');
  
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-4">Select Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md border pointer-events-auto"
              />
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
                      <SelectItem value="30">30 Minutes</SelectItem>
                      <SelectItem value="60">60 Minutes</SelectItem>
                      <SelectItem value="90">90 Minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Available Slots for {formattedDate}</h2>
          
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
