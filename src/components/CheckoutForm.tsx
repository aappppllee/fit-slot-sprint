import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, CreditCard, Check } from "lucide-react";
import { TimeSlotProps } from "./TimeSlot";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Mock time slots data - in a real app, this would be fetched from an API
const mockTimeSlots: Record<string, TimeSlotProps> = {
  "1": {
    id: "1",
    time: "7:00 AM",
    date: "Today",
    duration: "60 min",
    availableSpots: 8,
    price: 149
  },
  "2": {
    id: "2",
    time: "9:00 AM",
    date: "Today",
    duration: "60 min",
    availableSpots: 5,
    price: 149,
    featured: true
  },
  "3": {
    id: "3",
    time: "11:00 AM",
    date: "Today",
    duration: "60 min",
    availableSpots: 10,
    price: 149
  },
  "4": {
    id: "4",
    time: "1:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 7,
    price: 199
  },
  "5": {
    id: "5",
    time: "3:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 3,
    price: 199
  },
  "6": {
    id: "6",
    time: "5:00 PM",
    date: "Today",
    duration: "60 min",
    availableSpots: 2,
    price: 249,
    featured: true
  }
};

const CheckoutForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });
  
  // Get the time slot based on the ID from the URL
  const timeSlot = id ? mockTimeSlots[id] : null;
  
  if (!timeSlot) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Time slot not found</h2>
        <Button onClick={() => navigate("/book")}>Back to Booking</Button>
      </div>
    );
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Payment successful!",
        description: "Your slot has been booked successfully.",
      });
      navigate("/dashboard");
    }, 1500);
  };
  
  const taxAmount = timeSlot.price * 0.07; // Example tax calculation (7%)
  const totalAmount = timeSlot.price + taxAmount;
  
  return (
    <div className="max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input 
                        id="cardNumber" 
                        name="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        value={formData.cardNumber} 
                        onChange={handleChange} 
                        required 
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input 
                        id="expiry" 
                        name="expiry" 
                        placeholder="MM/YY" 
                        value={formData.expiry} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input 
                        id="cvc" 
                        name="cvc" 
                        placeholder="123" 
                        value={formData.cvc} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gym-soft-gray p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{timeSlot.time}</h3>
                  <p className="text-gray-600 mb-3">{timeSlot.date}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gym-purple mr-2" />
                      <span className="text-sm text-gray-700">{timeSlot.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gym-purple mr-2" />
                      <span className="text-sm text-gray-700">Main Gym</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Slot Price</span>
                    <span>₹{timeSlot.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
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
                <Button 
                  type="submit" 
                  className="w-full gradient-button" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Complete Payment <Check className="ml-2 h-4 w-4" />
                    </span>
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
