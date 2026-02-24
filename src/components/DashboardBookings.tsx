
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const DashboardBookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*, gyms(*), time_slots(*)")
      .eq("user_id", user.id)
      .order("booked_at", { ascending: false });

    if (data) setBookings(data as any[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" } as any)
      .eq("id", bookingId);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Booking cancelled" });
      fetchBookings();
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading bookings...</p>;

  const upcomingBookings = bookings.filter((b: any) => b.status === "confirmed");
  const pastBookings = bookings.filter((b: any) => b.status !== "confirmed");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Upcoming Bookings</h2>
        {upcomingBookings.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground my-6">You don't have any upcoming bookings.</p>
              <div className="flex justify-center">
                <Link to="/find-gym"><Button>Find a Gym</Button></Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingBookings.map((booking: any) => (
              <Card key={booking.id} className="card-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {booking.time_slots?.start_time} - {booking.time_slots?.end_time}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleCancel(booking.id)}>Cancel Booking</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{booking.time_slots?.duration_minutes} min • {booking.time_slots?.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{booking.gyms?.name || "Gym"}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {booking.payment_status === "paid" ? "Paid" : "Pending"}
                      </span>
                      <span className="font-bold">₹{Number(booking.total_amount).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {pastBookings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Past / Cancelled Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastBookings.map((booking: any) => (
              <Card key={booking.id} className="card-shadow opacity-75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    {booking.time_slots?.start_time} - {booking.time_slots?.end_time}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{booking.time_slots?.duration_minutes} min • {booking.time_slots?.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{booking.gyms?.name || "Gym"}</span>
                    </div>
                    <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full mt-2 capitalize">
                      {booking.status}
                    </span>
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
