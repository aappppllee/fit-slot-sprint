
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BookPage from "./pages/BookPage";
import CheckoutPage from "./pages/CheckoutPage";
import DashboardPage from "./pages/DashboardPage";
import GymFinderPage from "./pages/GymFinderPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterYourGymPage from "./pages/RegisterYourGymPage";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/find-gym" element={<GymFinderPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register-gym" element={<RegisterYourGymPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
