import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Smartphone, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DownloadApp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background">
      {/* Navbar */}
      <Navbar />

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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DownloadApp;
