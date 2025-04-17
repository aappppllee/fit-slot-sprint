
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardStats from "@/components/DashboardStats";
import DashboardBookings from "@/components/DashboardBookings";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
          
          <DashboardStats />
          <DashboardBookings />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
