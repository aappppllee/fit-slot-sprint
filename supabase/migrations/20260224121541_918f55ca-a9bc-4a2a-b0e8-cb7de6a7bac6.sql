
-- Create gym status enum
CREATE TYPE public.gym_status AS ENUM ('pending', 'approved', 'rejected');

-- Create booking status enum
CREATE TYPE public.booking_status AS ENUM ('confirmed', 'cancelled', 'completed');

-- Create payment status enum
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'refunded');

-- Add avatar_url and phone to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- Create gyms table
CREATE TABLE public.gyms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  zip_code TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  opening_hours_from TEXT,
  opening_hours_to TEXT,
  available_slots INTEGER DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 0,
  amenities TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  status gym_status DEFAULT 'approved',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gym_time_segments table
CREATE TABLE public.gym_time_segments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
  opening_time TEXT NOT NULL,
  closing_time TEXT NOT NULL,
  price_per_slot NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create time_slots table
CREATE TABLE public.time_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  price NUMERIC(10,2) NOT NULL,
  total_spots INTEGER DEFAULT 10,
  available_spots INTEGER DEFAULT 10,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  time_slot_id UUID NOT NULL REFERENCES public.time_slots(id) ON DELETE CASCADE,
  gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
  status booking_status DEFAULT 'confirmed',
  payment_status payment_status DEFAULT 'pending',
  amount_paid NUMERIC(10,2) DEFAULT 0,
  tax_amount NUMERIC(10,2) DEFAULT 0,
  total_amount NUMERIC(10,2) DEFAULT 0,
  booked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_time_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- GYMS RLS: publicly readable
CREATE POLICY "Gyms are publicly readable"
ON public.gyms FOR SELECT
USING (true);

CREATE POLICY "Gym owners can insert their own gyms"
ON public.gyms FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Gym owners can update their own gyms"
ON public.gyms FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id);

-- GYM_TIME_SEGMENTS RLS
CREATE POLICY "Time segments are publicly readable"
ON public.gym_time_segments FOR SELECT
USING (true);

CREATE POLICY "Gym owners can manage their time segments"
ON public.gym_time_segments FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.gyms WHERE id = gym_id AND owner_id = auth.uid())
);

CREATE POLICY "Gym owners can update their time segments"
ON public.gym_time_segments FOR UPDATE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.gyms WHERE id = gym_id AND owner_id = auth.uid())
);

CREATE POLICY "Gym owners can delete their time segments"
ON public.gym_time_segments FOR DELETE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.gyms WHERE id = gym_id AND owner_id = auth.uid())
);

-- TIME_SLOTS RLS
CREATE POLICY "Time slots are publicly readable"
ON public.time_slots FOR SELECT
USING (true);

CREATE POLICY "Gym owners can manage their time slots"
ON public.time_slots FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.gyms WHERE id = gym_id AND owner_id = auth.uid())
);

CREATE POLICY "Gym owners can update their time slots"
ON public.time_slots FOR UPDATE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.gyms WHERE id = gym_id AND owner_id = auth.uid())
);

CREATE POLICY "Gym owners can delete their time slots"
ON public.time_slots FOR DELETE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.gyms WHERE id = gym_id AND owner_id = auth.uid())
);

-- BOOKINGS RLS
CREATE POLICY "Users can view their own bookings"
ON public.bookings FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Gym owners can view bookings for their gyms"
ON public.bookings FOR SELECT
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.gyms WHERE id = gym_id AND owner_id = auth.uid())
);

CREATE POLICY "Users can create their own bookings"
ON public.bookings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
ON public.bookings FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- AVATARS storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Trigger for gyms updated_at
CREATE TRIGGER update_gyms_updated_at
BEFORE UPDATE ON public.gyms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
