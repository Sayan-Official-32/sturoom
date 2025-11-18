import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Search, Phone, MapPin, DollarSign, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ForBuyer = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Shield,
      title: "No Broker Fees",
      description: "Connect directly with owners and save thousands on broker commissions",
    },
    {
      icon: MapPin,
      title: "Near Your College",
      description: "Find rooms within walking distance of your institution",
    },
    {
      icon: DollarSign,
      title: "Budget Friendly",
      description: "Affordable options perfect for students",
    },
    {
      icon: Phone,
      title: "Direct Contact",
      description: "Call or WhatsApp owners directly from the platform",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Find Your Perfect Room <span className="text-primary">Today</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Search, connect, and move in - all without paying any broker fees
          </p>
          <Button size="lg" onClick={() => navigate("/student-auth")} className="hover-scale">
            <Search className="mr-2" />
            Start Searching Rooms
          </Button>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6 text-center">
                <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ForBuyer;
