
import { Calendar, CreditCard, Clock, Users } from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-gym-purple" />,
    title: "Easy Booking",
    description: "Book your gym slots in seconds with our intuitive calendar interface."
  },
  {
    icon: <CreditCard className="h-8 w-8 text-gym-purple" />,
    title: "Pay-as-you-go",
    description: "No memberships, no commitment. Only pay for the sessions you attend."
  },
  {
    icon: <Clock className="h-8 w-8 text-gym-purple" />,
    title: "Flexible Timing",
    description: "Multiple time slots available throughout the day to fit your schedule."
  },
  {
    icon: <Users className="h-8 w-8 text-gym-purple" />,
    title: "Limited Capacity",
    description: "We limit the number of bookings to ensure you have a great workout experience."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gym-soft-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why Choose FitSlot?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our pay-and-play model gives you complete flexibility with your workouts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg card-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
