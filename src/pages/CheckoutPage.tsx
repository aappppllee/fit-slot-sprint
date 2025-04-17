
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";

const CheckoutPage = () => {
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
