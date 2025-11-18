import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Smartphone, Download } from "lucide-react";

const DownloadApp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="relative flex items-center">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary hover-scale cursor-pointer" onClick={() => navigate("/")}>StuName</h1>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
              <Button variant="ghost" onClick={() => navigate("/")} className="hover-scale" size="sm"><Home className="mr-1 h-4 w-4" />Home</Button>
              <Button variant="ghost" onClick={() => navigate("/for-buyer")} className="hover-scale" size="sm">For Buyer</Button>
              <Button variant="ghost" onClick={() => navigate("/for-seller")} className="hover-scale" size="sm">For Seller</Button>
              <Button variant="ghost" onClick={() => navigate("/about")} className="hover-scale" size="sm">About</Button>
              <Button variant="ghost" onClick={() => navigate("/faq")} className="hover-scale" size="sm">FAQ</Button>
              <Button variant="ghost" onClick={() => navigate("/contact")} className="hover-scale" size="sm">Contact Us</Button>
              <Button variant="ghost" onClick={() => navigate("/download-app")} className="hover-scale" size="sm">Download App</Button>
            </div>
            <div className="flex-1 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => navigate("/student-auth")} className="hover-scale">Student Login</Button>
              <Button onClick={() => navigate("/owner-auth")} className="hover-scale">Owner Login</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20 text-center">
        <Smartphone className="w-24 h-24 text-primary mx-auto mb-8" />
        <h1 className="text-5xl font-bold mb-6">Download Our <span className="text-primary">Mobile App</span></h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Find rooms on the go! Download the StuName app for a better mobile experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="hover-scale">
            <Download className="mr-2" />
            Download for Android
          </Button>
          <Button size="lg" variant="outline" className="hover-scale">
            <Download className="mr-2" />
            Download for iOS
          </Button>
        </div>

        <p className="text-muted-foreground">Coming Soon to Play Store and App Store!</p>
      </div>

      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 StuName. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DownloadApp;
