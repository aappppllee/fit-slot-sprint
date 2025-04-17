
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedSlots from "@/components/FeaturedSlots";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturedSlots />
        <FeaturesSection />
        
        <section className="py-16 bg-gradient-to-r from-gym-purple to-gym-dark-purple text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Book your first gym session today and experience the flexibility of pay-as-you-go workouts.
            </p>
            <Link to="/book">
              <Button size="lg" variant="secondary" className="flex items-center gap-1">
                Book a Slot <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
        
        <TestimonialsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
