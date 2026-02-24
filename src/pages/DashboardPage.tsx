
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardStats from "@/components/DashboardStats";
import DashboardBookings from "@/components/DashboardBookings";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/gym-user-auth");
    }
  }, [user, loading, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

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
