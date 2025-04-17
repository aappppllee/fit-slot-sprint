
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCalendar from "@/components/BookingCalendar";

const BookPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 mb-8">
          <h1 className="text-3xl font-bold">Book a Gym Slot</h1>
          <p className="text-gray-600">
            Select a date and time that works for you.
          </p>
        </div>
        
        <BookingCalendar />
      </main>
      
      <Footer />
    </div>
  );
};

export default BookPage;
