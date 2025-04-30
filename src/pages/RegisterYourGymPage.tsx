
import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Building2, Clock, MapPin, CheckCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formSchema = z.object({
  gymName: z.string().min(2, "Gym name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  openingTime: z.string().min(1, "Opening time is required"),
  closingTime: z.string().min(1, "Closing time is required"),
  slots: z.number().min(1, "Must have at least 1 slot"),
  pricePerSlot: z.number().min(1, "Price must be at least 1"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const RegisterYourGymPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gymName: "",
      description: "",
      address: "",
      city: "",
      zipCode: "",
      openingTime: "05:00",
      closingTime: "21:00",
      slots: 10,
      pricePerSlot: 10,
      contactEmail: "",
      contactPhone: "",
      acceptTerms: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    toast({
      title: "Gym Registration Submitted",
      description: "We'll review your information and get back to you shortly.",
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Register Your Gym</h1>
            <p className="text-gray-600 text-center mb-8">
              Join our network and start offering your gym slots to our users
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="bg-white">
                <CardHeader className="space-y-1">
                  <div className="h-10 w-10 bg-gym-purple/20 rounded-full flex items-center justify-center mb-2">
                    <Building2 className="h-5 w-5 text-gym-purple" />
                  </div>
                  <CardTitle>List Your Gym</CardTitle>
                  <CardDescription>
                    Create your gym profile with details and photos
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="space-y-1">
                  <div className="h-10 w-10 bg-gym-purple/20 rounded-full flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-gym-purple" />
                  </div>
                  <CardTitle>Manage Slots</CardTitle>
                  <CardDescription>
                    Control your available slots and pricing
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="space-y-1">
                  <div className="h-10 w-10 bg-gym-purple/20 rounded-full flex items-center justify-center mb-2">
                    <MapPin className="h-5 w-5 text-gym-purple" />
                  </div>
                  <CardTitle>Reach Customers</CardTitle>
                  <CardDescription>
                    Get discovered by users in your area
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Gym Registration Form</CardTitle>
                <CardDescription>
                  Fill in the details below to register your gym on our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Basic Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="gymName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gym Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your gym name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your gym, facilities, and unique features" 
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Location</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Street address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="ZIP Code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Operating Hours & Slots</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="openingTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Opening Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="closingTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Closing Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="slots"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Available Slots</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="1"
                                  placeholder="Number of slots" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormDescription>
                                Maximum number of people per time slot
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="pricePerSlot"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price per Slot ($)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="1"
                                  step="0.01"
                                  placeholder="Price" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Contact Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="contactEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="contactPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Phone</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="Phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I accept the terms and conditions
                            </FormLabel>
                            <FormDescription>
                              By registering, you agree to our terms of service and privacy policy.
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Register Your Gym</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <div className="mt-10 bg-white rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-gym-purple mr-2" />
                Why Join Our Platform
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gym-purple mr-2 mt-1" />
                  <span>Reach more customers and increase your revenue</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gym-purple mr-2 mt-1" />
                  <span>Easy-to-use slot management system</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gym-purple mr-2 mt-1" />
                  <span>Get analytics and insights on your gym's performance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gym-purple mr-2 mt-1" />
                  <span>Zero upfront costs - we only charge a small fee per booking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterYourGymPage;
