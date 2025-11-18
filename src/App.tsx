import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentAuth from "./pages/StudentAuth";
import OwnerAuth from "./pages/OwnerAuth";
import EnhancedRooms from "./pages/EnhancedRooms";
import EnhancedRoomDetails from "./pages/EnhancedRoomDetails";
import UploadRoom from "./pages/UploadRoom";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ForBuyer from "./pages/ForBuyer";
import ForSeller from "./pages/ForSeller";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import DownloadApp from "./pages/DownloadApp";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student-auth" element={<StudentAuth />} />
          <Route path="/owner-auth" element={<OwnerAuth />} />
          <Route path="/rooms" element={<EnhancedRooms />} />
          <Route path="/room/:id" element={<EnhancedRoomDetails />} />
          <Route path="/upload-room" element={<UploadRoom />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/for-buyer" element={<ForBuyer />} />
          <Route path="/for-seller" element={<ForSeller />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/download-app" element={<DownloadApp />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
