
import { Gym } from "@/types/gym";

export const mockGyms: Gym[] = [
  {
    id: "gym-001",
    name: "FitZone Elite",
    description: "Premium fitness center with state-of-the-art equipment and personal training services.",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80",
    location: {
      address: "123 MG Road",
      city: "Mumbai",
      zipCode: "400001",
      coordinates: {
        latitude: 19.0760,
        longitude: 72.8777
      }
    },
    openingHours: {
      from: "5:00 AM",
      to: "11:00 PM"
    },
    availableSlots: 24,
    pricePerSlot: 199,
    rating: 4.7,
    amenities: ["Personal Training", "Sauna", "Pool", "Locker Rooms", "Towel Service", "Cardio Machines"],
    featured: true
  },
  {
    id: "gym-002",
    name: "PowerLift Gym",
    description: "Specialized strength training facility with premium free weights and powerlifting equipment.",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    location: {
      address: "456 Connaught Place",
      city: "Delhi",
      zipCode: "110001",
      coordinates: {
        latitude: 28.7041,
        longitude: 77.1025
      }
    },
    openingHours: {
      from: "6:00 AM",
      to: "10:00 PM"
    },
    availableSlots: 18,
    pricePerSlot: 149,
    rating: 4.5,
    amenities: ["Free Weights", "Power Racks", "Deadlift Platforms", "Chalk Allowed"]
  },
  {
    id: "gym-003",
    name: "Flex Fitness Studio",
    description: "Boutique fitness studio offering personalized training plans and small group classes.",
    imageUrl: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    location: {
      address: "789 Brigade Road",
      city: "Bangalore",
      zipCode: "560001",
      coordinates: {
        latitude: 12.9716,
        longitude: 77.5946
      }
    },
    openingHours: {
      from: "7:00 AM",
      to: "9:00 PM"
    },
    availableSlots: 12,
    pricePerSlot: 249,
    rating: 4.8,
    amenities: ["Group Classes", "Yoga Studio", "Nutritionist", "Massage Therapy"],
    featured: true
  },
  {
    id: "gym-004",
    name: "Urban Fitness Club",
    description: "Modern, inclusive gym for all fitness levels with 24/7 access.",
    imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    location: {
      address: "101 Park Street",
      city: "Kolkata",
      zipCode: "700016",
      coordinates: {
        latitude: 22.5726,
        longitude: 88.3639
      }
    },
    openingHours: {
      from: "24/7",
      to: "24/7"
    },
    availableSlots: 30,
    pricePerSlot: 99,
    rating: 4.2,
    amenities: ["24/7 Access", "Cardio Theater", "Free Wi-Fi", "Mobile App Access"]
  },
  {
    id: "gym-005",
    name: "CrossTrain Revolution",
    description: "High-intensity functional training facility with coach-led classes and open gym time.",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    location: {
      address: "222 Banjara Hills",
      city: "Hyderabad",
      zipCode: "500034",
      coordinates: {
        latitude: 17.3850,
        longitude: 78.4867
      }
    },
    openingHours: {
      from: "5:30 AM",
      to: "8:30 PM"
    },
    availableSlots: 15,
    pricePerSlot: 179,
    rating: 4.9,
    amenities: ["Group Training", "Olympic Weightlifting", "Gymnastics Area", "Recovery Zone"]
  },
  {
    id: "gym-006",
    name: "Zen Wellness Center",
    description: "Holistic fitness center focusing on mind-body connection with diverse class offerings.",
    imageUrl: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    location: {
      address: "333 Koregaon Park",
      city: "Pune",
      zipCode: "411001",
      coordinates: {
        latitude: 18.5204,
        longitude: 73.8567
      }
    },
    openingHours: {
      from: "6:00 AM",
      to: "9:00 PM"
    },
    availableSlots: 20,
    pricePerSlot: 169,
    rating: 4.6,
    amenities: ["Yoga", "Pilates", "Meditation Studio", "Spa Services", "Smoothie Bar"]
  }
];
