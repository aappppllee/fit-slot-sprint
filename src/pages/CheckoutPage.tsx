
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";
import { useAuth } from "@/hooks/useAuth";

const CheckoutPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/gym-user-auth");
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-600">
            Complete your booking by providing your details and payment information.
          </p>
        </div>
        
        <CheckoutForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
