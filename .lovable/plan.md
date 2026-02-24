

# Full Backend Implementation for FitSlot

## What This Covers

Right now, your app uses mock/hardcoded data everywhere -- gyms, time slots, bookings, and the dashboard are all fake. This plan will replace all of that with a real, working backend.

---

## Phase 1: Database Schema

Create the following tables to power the entire app:

### `gyms` table
Stores gym information registered by gym owners.
- id, owner_id (linked to auth user), name, description, image_url, address, city, zip_code, latitude, longitude, opening_hours_from, opening_hours_to, available_slots, rating, amenities (text array), featured, status (pending/approved/rejected), created_at, updated_at

### `gym_time_segments` table
Operating hours and pricing set by gym owners during registration.
- id, gym_id, opening_time, closing_time, price_per_slot, created_at

### `time_slots` table
Individual bookable slots generated from time segments.
- id, gym_id, date, start_time, end_time, duration_minutes, price, total_spots, available_spots, featured, created_at

### `bookings` table
Records of user bookings.
- id, user_id, time_slot_id, gym_id, status (confirmed/cancelled/completed), payment_status (pending/paid/refunded), amount_paid, tax_amount, total_amount, booked_at, created_at

### `profiles` table update
Add avatar_url and phone columns to the existing profiles table.

### `avatars` storage bucket
For profile picture uploads.

### Security (RLS Policies)
- Gyms: publicly readable, owners can insert/update their own
- Time slots: publicly readable, gym owners can manage their gym's slots
- Bookings: users can view/create their own, gym owners can view bookings for their gyms
- Profiles: users can view/update their own profile
- Avatars: users can upload/update/delete their own, publicly viewable

---

## Phase 2: Gym Registration (Gym Owner Flow)

Update `RegisterYourGymPage.tsx` to:
- Save gym data to the `gyms` table with the logged-in owner's ID
- Save time segments to `gym_time_segments` table
- Auto-fill owner name and email from profile
- Show success message after registration

---

## Phase 3: Gym Finder (Public)

Update `GymFinderPage.tsx`, `GymList.tsx`, and `GymSearch.tsx` to:
- Fetch real gyms from the database instead of mock data
- Search/filter by city, name, or zip code
- Only show approved gyms

---

## Phase 4: Booking Flow (Gym User)

Update `BookingCalendar.tsx` and `TimeSlot.tsx` to:
- Fetch real time slots from the database for the selected gym and date
- Decrease available spots when a booking is made
- Link "Book Now" to real checkout

Update `CheckoutForm.tsx` to:
- Create a real booking record in the database
- Auto-fill user info from profile
- Calculate and store tax/total amounts
- Redirect to dashboard on success

---

## Phase 5: Dashboard

Update `DashboardStats.tsx` and `DashboardBookings.tsx` to:
- Fetch real booking data for the logged-in user
- Calculate real stats (total bookings, upcoming sessions, total spent)
- Show real upcoming and past bookings
- Enable cancel booking functionality

---

## Phase 6: Profile Page

Create a new `/profile` page with:
- Profile picture upload (using storage bucket)
- Edit full name, email, phone
- View current role (gym user or gym owner)
- Update Navbar to show profile link when logged in

---

## Phase 7: Navbar Updates

- Show user avatar and name when logged in
- Replace "Login" button with profile dropdown (Profile, Dashboard, Logout)
- Conditionally show "Register Gym" only for gym owners

---

## Technical Details

### Database Migration
A single SQL migration will create all new tables, add columns, create the storage bucket, and set up all RLS policies.

### Files to Create
- `src/pages/ProfilePage.tsx` -- Profile editing page with avatar upload

### Files to Update
- `src/pages/RegisterYourGymPage.tsx` -- Save to database
- `src/pages/GymFinderPage.tsx` -- Fetch from database
- `src/components/GymList.tsx` -- Use real data
- `src/components/GymSearch.tsx` -- Real search queries
- `src/components/BookingCalendar.tsx` -- Fetch real slots
- `src/components/CheckoutForm.tsx` -- Create real bookings
- `src/components/DashboardStats.tsx` -- Real stats from DB
- `src/components/DashboardBookings.tsx` -- Real bookings from DB
- `src/components/Navbar.tsx` -- Auth-aware navigation
- `src/pages/DashboardPage.tsx` -- Auth protection
- `src/App.tsx` -- Add /profile route
- `src/types/gym.ts` -- Update types to match DB schema

### Files to Remove
- `src/data/mockGyms.ts` -- No longer needed

### Implementation Order
1. Database migration (tables + RLS + storage)
2. Update types
3. Profile page + avatar upload
4. Gym registration (save to DB)
5. Gym finder (read from DB)
6. Booking calendar + checkout (read/write DB)
7. Dashboard (read from DB)
8. Navbar updates

