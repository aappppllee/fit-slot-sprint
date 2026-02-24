
export interface GymLocation {
  address: string;
  city: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface OpeningHours {
  from: string;
  to: string;
}

export interface Gym {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: GymLocation;
  openingHours: OpeningHours;
  availableSlots: number;
  pricePerSlot: number;
  rating?: number;
  amenities?: string[];
  featured?: boolean;
}
