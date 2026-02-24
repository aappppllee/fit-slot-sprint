
export interface Gym {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  address: string;
  city: string;
  zip_code: string | null;
  latitude: number | null;
  longitude: number | null;
  opening_hours_from: string | null;
  opening_hours_to: string | null;
  available_slots: number;
  rating: number;
  amenities: string[];
  featured: boolean;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface GymTimeSegment {
  id: string;
  gym_id: string;
  opening_time: string;
  closing_time: string;
  price_per_slot: number;
  created_at: string;
}

export interface TimeSlot {
  id: string;
  gym_id: string;
  date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  price: number;
  total_spots: number;
  available_spots: number;
  featured: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  time_slot_id: string;
  gym_id: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  amount_paid: number;
  tax_amount: number;
  total_amount: number;
  booked_at: string;
  created_at: string;
  // Joined data
  gym?: Gym;
  time_slot?: TimeSlot;
}
