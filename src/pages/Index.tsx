import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Home, Shield, Zap, CheckCircle, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/rooms?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "No Broker Fees",
      description: "Connect directly with room owners and save money on broker commissions",
    },
    {
      icon: MapPin,
      title: "Near Your College",
      description: "Find rooms within walking distance of your college or hospital",
    },
    {
      icon: DollarSign,
      title: "Budget Friendly",
      description: "Affordable rooms perfect for students on a tight budget",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Search Rooms",
      description: "Search by college name or city to find available rooms",
    },
    {
      number: "2",
      title: "View Details",
      description: "Check room photos, amenities, and distance from your college",
    },
    {
      number: "3",
      title: "Contact Owner",
      description: "Directly call or WhatsApp the owner to schedule a visit",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background">
    {/* Navbar */}
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="relative flex items-center">
          {/* Logo - Left */}
          <div className="flex-1">
            <h1 
              className="text-2xl font-bold text-primary hover-scale cursor-pointer"
              onClick={() => navigate("/")}
            >
              StuName
            </h1>
          </div>

          {/* Center Navigation - Absolute Centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="hover-scale"
              size="sm"
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/for-buyer")}
              className="hover-scale"
              size="sm"
            >
              For Buyer
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/for-seller")}
              className="hover-scale"
              size="sm"
            >
              For Seller
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/about")}
              className="hover-scale"
              size="sm"
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/faq")}
              className="hover-scale"
              size="sm"
            >
              FAQ
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/contact")}
              className="hover-scale"
              size="sm"
            >
              Contact Us
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/download-app")}
              className="hover-scale"
              size="sm"
            >
              Download App
            </Button>
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate("/student-auth")} 
              className="hover-scale"
            >
              Student Login
            </Button>
            <Button 
              onClick={() => navigate("/owner-auth")} 
              className="hover-scale"
            >
              Owner Login
            </Button>
          </div>
        </div>
      </div>
    </nav>


      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 animate-fade-in-up">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in">
            Find Your Perfect Room
            <br />
            <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Near College
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Connect directly with room owners. No brokers. No hidden fees. Just affordable rooms for students.
          </p>

          {/* Search Bar */}
          <div className="flex gap-2 max-w-2xl mx-auto mb-4 animate-scale-in" style={{animationDelay: '0.4s'}}>
            <Input
              type="text"
              placeholder="Search by college name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="h-14 text-lg shadow-lg"
            />
            <Button onClick={handleSearch} size="lg" className="h-14 px-8 hover-scale">
              <Search className="mr-2" />
              Search
            </Button>
          </div>
          <p className="text-sm text-muted-foreground animate-fade-in" style={{animationDelay: '0.6s'}}>
            Try: "IIT Delhi", "Mumbai", "AIIMS Delhi"
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose StuName?</h3>
          <p className="text-lg text-muted-foreground">The easiest way to find student-friendly rooms</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-all duration-300 hover-lift cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-accent/30 rounded-3xl">
        <div className="text-center mb-12 animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h3>
          <p className="text-lg text-muted-foreground">Find your room in 3 simple steps</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-lg hover-scale transition-transform">
                {step.number}
              </div>
              <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-3xl p-12 shadow-2xl animate-scale-in">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Room?</h3>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of students who found their perfect accommodation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/student-auth")}
              className="text-lg px-8 hover-scale"
            >
              <Home className="mr-2" />
              I'm a Student
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/owner-auth")}
              className="text-lg px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover-scale"
            >
              <Zap className="mr-2" />
              I'm an Owner
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 StuName. All rights reserved.</p>
          <p className="mt-2">Connecting students with affordable rooms, without brokers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
