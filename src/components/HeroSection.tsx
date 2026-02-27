
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-gym-purple/10 to-gym-light-purple/20 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Gym Slot <span className="text-gym-purple">Anytime</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Flexible pay-and-play gym sessions. No memberships, no commitments.
            Just book, pay, and workout when it suits you.
          </p>
          <div className="flex space-x-4">
            <Link to="/find-gym">
              <Button size="lg" className="gradient-button">Book Now</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">View Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden md:block absolute bottom-0 right-0 w-1/3 h-full bg-gym-purple/5 -z-10 rounded-tl-[100px]"></div>
      <div className="hidden md:block absolute top-20 right-40 w-32 h-32 bg-gym-purple/10 rounded-full -z-10"></div>
      <div className="hidden md:block absolute bottom-20 right-80 w-16 h-16 bg-gym-purple/15 rounded-full -z-10"></div>
    </div>
  );
};

export default HeroSection;
