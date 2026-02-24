
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const timeSegmentSchema = z.object({
  openingTime: z.string().min(1, "Opening time is required"),
  closingTime: z.string().min(1, "Closing time is required"),
  pricePerSlot: z.string().min(1, "Price per slot is required"),
});

const gymRegistrationSchema = z.object({
  gymName: z.string().min(2, "Gym name must be at least 2 characters"),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  timeSegments: z.array(timeSegmentSchema).min(1, "At least one time segment is required"),
  amenities: z.string().min(10, "Please list at least some amenities"),
});

type GymRegistrationFormData = z.infer<typeof gymRegistrationSchema>;

const RegisterYourGymPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth('gym_owner');
  const navigate = useNavigate();

  const form = useForm<GymRegistrationFormData>({
    resolver: zodResolver(gymRegistrationSchema),
    defaultValues: {
      gymName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      description: "",
      timeSegments: [{ openingTime: "", closingTime: "", pricePerSlot: "" }],
      amenities: "",
    },
  });

  // Auto-fill from profile when user is logged in
  useEffect(() => {
    const fillProfile = async () => {
      if (!user) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        form.setValue("ownerName", data.full_name || "");
        form.setValue("email", data.email || "");
        form.setValue("phone", (data as any).phone || "");
      }
    };
    fillProfile();
  }, [user]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "timeSegments",
  });

  const onSubmit = async (data: GymRegistrationFormData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to register your gym",
        variant: "destructive",
      });
      navigate("/gym-owner-auth");
      return;
    }
    
    setIsLoading(true);
    try {
      // Insert gym
      const amenitiesArray = data.amenities.split(",").map(a => a.trim()).filter(Boolean);
      const firstSegment = data.timeSegments[0];

      const { data: gym, error: gymError } = await supabase
        .from("gyms")
        .insert({
          owner_id: user.id,
          name: data.gymName,
          description: data.description,
          address: data.address,
          city: data.city,
          zip_code: data.zipCode,
          opening_hours_from: firstSegment.openingTime,
          opening_hours_to: data.timeSegments[data.timeSegments.length - 1].closingTime,
          amenities: amenitiesArray,
          available_slots: 10,
        } as any)
        .select()
        .single();

      if (gymError) throw gymError;

      // Insert time segments
      const segments = data.timeSegments.map(seg => ({
        gym_id: (gym as any).id,
        opening_time: seg.openingTime,
        closing_time: seg.closingTime,
        price_per_slot: parseFloat(seg.pricePerSlot),
      }));

      const { error: segError } = await supabase.from("gym_time_segments").insert(segments as any);
      if (segError) throw segError;

      toast({
        title: "Success!",
        description: "Your gym has been registered successfully.",
      });
      form.reset();
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Registration failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Register Your Gym</CardTitle>
              <CardDescription>
                Join our network and start accepting bookings from fitness enthusiasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="gymName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gym Name</FormLabel>
                        <FormControl><Input placeholder="Enter gym name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="ownerName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner Name</FormLabel>
                        <FormControl><Input placeholder="Enter owner name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="Enter email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input placeholder="Enter phone number" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl><Input placeholder="Enter complete address" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="Enter city" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="zipCode" render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl><Input placeholder="Enter ZIP code" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gym Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your gym, facilities, and what makes it special..." className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Operating Hours & Pricing</h3>
                      <Button type="button" variant="outline" size="sm" onClick={() => append({ openingTime: "", closingTime: "", pricePerSlot: "" })} className="gap-2">
                        <Plus className="h-4 w-4" /> Add Time Segment
                      </Button>
                    </div>

                    {fields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Time Segment {index + 1}</h4>
                          {fields.length > 1 && (
                            <Button type="button" variant="outline" size="sm" onClick={() => remove(index)} className="gap-2 text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" /> Remove
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField control={form.control} name={`timeSegments.${index}.openingTime`} render={({ field }) => (
                            <FormItem>
                              <FormLabel>Opening Time</FormLabel>
                              <FormControl><Input type="time" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name={`timeSegments.${index}.closingTime`} render={({ field }) => (
                            <FormItem>
                              <FormLabel>Closing Time</FormLabel>
                              <FormControl><Input type="time" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name={`timeSegments.${index}.pricePerSlot`} render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price per Slot (₹)</FormLabel>
                              <FormControl><Input type="number" placeholder="199" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <FormField control={form.control} name="amenities" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amenities</FormLabel>
                      <FormControl>
                        <Textarea placeholder="List your amenities separated by commas (e.g., AC, Wi-Fi, Parking, Locker Room)" className="min-h-[80px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button type="submit" className="w-full gradient-button" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Register Gym"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterYourGymPage;
