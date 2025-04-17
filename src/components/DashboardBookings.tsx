
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BookingProps {
  id: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  paid: boolean;
  upcoming: boolean;
}

const bookings: BookingProps[] = [
  {
    id: "1",
    date: "Today",
    time: "5:00 PM",
    duration: "60 min",
    location: "Main Gym",
    paid: true,
    upcoming: true,
  },
  {
    id: "2",
    date: "Tomorrow",
    time: "7:00 AM",
    duration: "60 min",
    location: "Main Gym",
    paid: true,
    upcoming: true,
  },
  {
    id: "3",
    date: "Apr 20, 2025",
    time: "9:00 AM",
    duration: "60 min",
    location: "Main Gym",
    paid: true,
    upcoming: true,
  },
  {
    id: "4",
    date: "Apr 15, 2025",
    time: "1:00 PM",
    duration: "60 min",
    location: "Main Gym",
    paid: true,
    upcoming: false,
  }
];

const DashboardBookings = () => {
  const upcomingBookings = bookings.filter(booking => booking.upcoming);
  const pastBookings = bookings.filter(booking => !booking.upcoming);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Upcoming Bookings</h2>
        
        {upcomingBookings.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500 my-6">You don't have any upcoming bookings.</p>
              <div className="flex justify-center">
                <Button>Book a Slot</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id} className="card-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{booking.date} at {booking.time}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Cancel Booking</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>View Receipt</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gym-purple mr-2" />
                      <span className="text-sm text-gray-700">{booking.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gym-purple mr-2" />
                      <span className="text-sm text-gray-700">{booking.location}</span>
                    </div>
                    {booking.paid && (
                      <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                        Paid
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {pastBookings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Past Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastBookings.map((booking) => (
              <Card key={booking.id} className="card-shadow opacity-75">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{booking.date} at {booking.time}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Book Again</DropdownMenuItem>
                        <DropdownMenuItem>View Receipt</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gym-purple mr-2" />
                      <span className="text-sm text-gray-700">{booking.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gym-purple mr-2" />
                      <span className="text-sm text-gray-700">{booking.location}</span>
                    </div>
                    {booking.paid && (
                      <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                        Completed
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardBookings;
