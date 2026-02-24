
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, CreditCard, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const CheckoutForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSlot, setTimeSlot] = useState<any>(null);
  const [gym, setGym] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchSlot = async () => {
      if (!id) return;
      const { data } = await supabase.from("time_slots").select("*").eq("id", id).single();
      if (data) {
        setTimeSlot(data);
        const { data: gymData } = await supabase.from("gyms").select("*").eq("id", (data as any).gym_id).single();
        if (gymData) setGym(gymData);
      }
      setLoading(false);
    };
    fetchSlot();
  }, [id]);

  // Auto-fill user info
  useEffect(() => {
    const fillProfile = async () => {
      if (!user) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        setFormData({ name: data.full_name || "", email: data.email || "" });
      }
    };
    fillProfile();
  }, [user]);
  
  if (loading) return <div className="text-center py-12">Loading...</div>;
  
  if (!timeSlot) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Time slot not found</h2>
        <Button onClick={() => navigate("/book")}>Back to Booking</Button>
      </div>
    );
  }

  const price = Number(timeSlot.price);
  const taxAmount = price * 0.07;
  const totalAmount = price + taxAmount;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Please log in first", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);

    try {
      // Create booking
      const { error: bookingError } = await supabase.from("bookings").insert({
        user_id: user.id,
        time_slot_id: timeSlot.id,
        gym_id: timeSlot.gym_id,
        amount_paid: price,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        payment_status: "paid",
        status: "confirmed",
      } as any);

      if (bookingError) throw bookingError;

      // Decrease available spots
      await supabase
        .from("time_slots")
        .update({ available_spots: timeSlot.available_spots - 1 } as any)
        .eq("id", timeSlot.id);

      toast({ title: "Booking confirmed!", description: "Your slot has been booked successfully." });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card className="sticky top-6">
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{timeSlot.start_time} - {timeSlot.end_time}</h3>
                  <p className="text-muted-foreground mb-3">{timeSlot.date}</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{timeSlot.duration_minutes} min</span>
                    </div>
                    {gym && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">{gym.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slot Price</span>
                    <span>₹{price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>₹{taxAmount.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full gradient-button" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : (
                    <span className="flex items-center">Complete Booking <Check className="ml-2 h-4 w-4" /></span>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
