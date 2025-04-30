
import { Gym } from "@/types/gym";

export const mockGyms: Gym[] = [
  {
    id: "gym-001",
    name: "FitZone Elite",
    description: "Premium fitness center with state-of-the-art equipment and personal training services.",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80",
    location: {
      address: "123 Fitness Ave",
      city: "New York",
      zipCode: "10001",
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    },
    openingHours: {
      from: "5:00 AM",
      to: "11:00 PM"
    },
    availableSlots: 24,
    pricePerSlot: 15.99,
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
      address: "456 Strong St",
      city: "Chicago",
      zipCode: "60601",
      coordinates: {
        latitude: 41.8781,
        longitude: -87.6298
      }
    },
    openingHours: {
      from: "6:00 AM",
      to: "10:00 PM"
    },
    availableSlots: 18,
    pricePerSlot: 12.99,
    rating: 4.5,
    amenities: ["Free Weights", "Power Racks", "Deadlift Platforms", "Chalk Allowed"]
  },
  {
    id: "gym-003",
    name: "Flex Fitness Studio",
    description: "Boutique fitness studio offering personalized training plans and small group classes.",
    imageUrl: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    location: {
      address: "789 Flex Blvd",
      city: "Los Angeles",
      zipCode: "90001",
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437
      }
    },
    openingHours: {
      from: "7:00 AM",
      to: "9:00 PM"
    },
    availableSlots: 12,
    pricePerSlot: 18.99,
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
      address: "101 Downtown Ave",
      city: "Seattle",
      zipCode: "98101",
      coordinates: {
        latitude: 47.6062,
        longitude: -122.3321
      }
    },
    openingHours: {
      from: "24/7",
      to: "24/7"
    },
    availableSlots: 30,
    pricePerSlot: 9.99,
    rating: 4.2,
    amenities: ["24/7 Access", "Cardio Theater", "Free Wi-Fi", "Mobile App Access"]
  },
  {
    id: "gym-005",
    name: "CrossTrain Revolution",
    description: "High-intensity functional training facility with coach-led classes and open gym time.",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    location: {
      address: "222 Functional St",
      city: "Miami",
      zipCode: "33101",
      coordinates: {
        latitude: 25.7617,
        longitude: -80.1918
      }
    },
    openingHours: {
      from: "5:30 AM",
      to: "8:30 PM"
    },
    availableSlots: 15,
    pricePerSlot: 16.99,
    rating: 4.9,
    amenities: ["Group Training", "Olympic Weightlifting", "Gymnastics Area", "Recovery Zone"]
  },
  {
    id: "gym-006",
    name: "Zen Wellness Center",
    description: "Holistic fitness center focusing on mind-body connection with diverse class offerings.",
    imageUrl: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    location: {
      address: "333 Calm Way",
      city: "San Francisco",
      zipCode: "94101",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194
      }
    },
    openingHours: {
      from: "6:00 AM",
      to: "9:00 PM"
    },
    availableSlots: 20,
    pricePerSlot: 14.99,
    rating: 4.6,
    amenities: ["Yoga", "Pilates", "Meditation Studio", "Spa Services", "Smoothie Bar"]
  }
];
