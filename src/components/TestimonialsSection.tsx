
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Regular Gym-goer",
    image: null,
    initials: "PS",
    testimonial: "FitSlot has completely transformed my workout routine. I love being able to book slots when it's convenient for me without being tied to a membership."
  },
  {
    id: 2,
    name: "Arjun Patel",
    role: "Business Traveler",
    image: null,
    initials: "AP",
    testimonial: "As someone who travels frequently, traditional gym memberships never worked for me. The pay-as-you-go model is perfect for my unpredictable schedule."
  },
  {
    id: 3,
    name: "Kavya Reddy",
    role: "Fitness Enthusiast",
    image: null,
    initials: "KR",
    testimonial: "The booking process is so smooth, and I love that I can see exactly how many people will be in the gym during my slot. It makes planning my workouts so much easier."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from people who have transformed their fitness routines with our flexible booking system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg card-shadow">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  {testimonial.image ? (
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  ) : null}
                  <AvatarFallback className="bg-gym-purple text-white">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
