
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CreditCard, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const DashboardStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, upcoming: 0, spent: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      const { data: bookings } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id);

      if (bookings) {
        const total = bookings.length;
        const upcoming = bookings.filter((b: any) => b.status === "confirmed").length;
        const spent = bookings.reduce((sum: number, b: any) => sum + Number(b.total_amount || 0), 0);
        setStats({ total, upcoming, spent });
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Bookings</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Calendar className="h-6 w-6 text-primary mr-2" />
            <span className="text-2xl font-bold">{stats.total}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-primary mr-2" />
            <span className="text-2xl font-bold">{stats.upcoming}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Spent</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center">
            <CreditCard className="h-6 w-6 text-primary mr-2" />
            <span className="text-2xl font-bold">₹{stats.spent.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active Bookings</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-primary mr-2" />
            <span className="text-2xl font-bold">{stats.upcoming}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
