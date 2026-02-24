
import * as React from "react";
import { format, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TimeSlot from "./TimeSlot";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

interface BookingCalendarProps {
  gymId?: string;
}

const BookingCalendar = ({ gymId }: BookingCalendarProps) => {
  const isMobile = useIsMobile();
  const [date, setDate] = React.useState<Date>(new Date());
  const [sessionType, setSessionType] = React.useState("all");
  const [duration, setDuration] = React.useState("120");
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [timeSlots, setTimeSlots] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchSlots = async () => {
    if (!gymId) return;
    setLoading(true);
    const dateStr = format(date, "yyyy-MM-dd");
    const { data, error } = await supabase
      .from("time_slots")
      .select("*")
      .eq("gym_id", gymId)
      .eq("date", dateStr)
      .gt("available_spots", 0);

    if (!error && data) {
      setTimeSlots(data as any[]);
    } else {
      setTimeSlots([]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchSlots();
  }, [date, gymId]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setShowCalendar(false);
    }
  };

  const formattedDate = format(date, "EEEE, MMMM do, yyyy");

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-4">Select Date</h3>
              <div className="flex flex-col space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant={new Date().toDateString() === date.toDateString() ? "default" : "outline"} onClick={() => setDate(new Date())}>Today</Button>
                  <Button variant={addDays(new Date(), 1).toDateString() === date.toDateString() ? "default" : "outline"} onClick={() => setDate(addDays(new Date(), 1))}>Tomorrow</Button>
                </div>
                <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" /><span>Custom Date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={handleDateChange} className="rounded-md border pointer-events-auto" />
                  </PopoverContent>
                </Popover>
                <div className="text-center py-2 px-3 bg-primary/10 rounded-md">
                  <p className="text-sm font-medium">{formattedDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Available Slots for {formattedDate}</h2>
          
          {loading ? (
            <p className="text-muted-foreground text-center py-10">Loading slots...</p>
          ) : timeSlots.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">No slots available for this date. The gym owner hasn't created slots yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {timeSlots.map((slot: any) => (
                <TimeSlot
                  key={slot.id}
                  id={slot.id}
                  time={slot.start_time}
                  date={format(date, "MMM dd, yyyy")}
                  duration={`${slot.duration_minutes} min`}
                  availableSpots={slot.available_spots}
                  price={Number(slot.price)}
                  featured={slot.featured}
                  gymId={gymId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
