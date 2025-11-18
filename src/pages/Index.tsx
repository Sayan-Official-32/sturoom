import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Home, Shield, Zap, MapPin, DollarSign, Star, Users, TrendingUp, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: MapPin,
      title: "Near Your College",
      description: "Find rooms within walking distance of your college or hospital",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: DollarSign,
      title: "Budget Friendly",
      description: "Affordable rooms perfect for students on a tight budget",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Search Rooms",
      description: "Search by college name or city to find available rooms",
      icon: Search,
    },
    {
      number: "2",
      title: "View Details",
      description: "Check room photos, amenities, and distance from your college",
      icon: Home,
    },
    {
      number: "3",
      title: "Contact Owner",
      description: "Directly call or WhatsApp the owner to schedule a visit",
      icon: Users,
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      college: "IIT Delhi",
      rating: 5,
      text: "Found my perfect room in just 2 days! No broker hassle, direct contact with the owner.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
    },
    {
      name: "Priya Patel",
      college: "AIIMS Mumbai",
      rating: 5,
      text: "Saved ₹15,000 in broker fees! The platform is so easy to use and rooms are verified.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    {
      name: "Arjun Kumar",
      college: "NIT Trichy",
      rating: 5,
      text: "Best decision ever! Found a room 5 minutes from my college at an amazing price.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
    },
  ];

  const popularCities = [
    { name: "Delhi", rooms: 450, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop" },
    { name: "Mumbai", rooms: 380, image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&h=300&fit=crop" },
    { name: "Bangalore", rooms: 520, image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&h=300&fit=crop" },
    { name: "Pune", rooms: 290, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop" },
  ];

  const stats = [
    { number: "1000+", label: "Verified Rooms", icon: Home },
    { number: "500+", label: "Happy Students", icon: Users },
    { number: "50+", label: "Cities Covered", icon: MapPin },
    { number: "₹15K+", label: "Avg. Savings", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Background Pattern */}
      <section className="relative container mx-auto px-4 py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <Badge className="mb-4 animate-fade-in" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              India's #1 Student Housing Platform
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in">
              Find Your Perfect Room
              <br />
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Near College
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Connect directly with room owners. <span className="font-semibold text-foreground">No brokers. No hidden fees.</span> Just affordable rooms for students.
            </p>

            {/* Search Bar */}
            <div className="animate-scale-in" style={{animationDelay: '0.4s'}}>
              <div className="flex gap-2 max-w-2xl mx-auto lg:mx-0 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by college name or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="h-14 text-lg shadow-lg pl-12 border-2 focus:border-primary"
                  />
                </div>
                <Button onClick={handleSearch} size="lg" className="h-14 px-8 hover-scale">
                  <Search className="mr-2" />
                  Search
                </Button>
              </div>
              <p className="text-sm text-muted-foreground animate-fade-in" style={{animationDelay: '0.6s'}}>
                💡 Try: "IIT Delhi", "Mumbai", "AIIMS Delhi"
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start animate-fade-in" style={{animationDelay: '0.8s'}}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Zero Broker Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Verified Rooms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Instant Connect</span>
              </div>
            </div>
          </div>

          {/* Right - Hero Images */}
          <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Main Image */}
              <img 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop" 
                alt="Student Room" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Card - Floating Price Tag */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl animate-bounce-slow">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="text-3xl font-bold text-primary">₹5,000/mo</p>
              </div>

              {/* Overlay Card - Available Rooms */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Home className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1000+</p>
                    <p className="text-sm text-muted-foreground">Verified Rooms</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small floating images */}
            <div className="hidden lg:block absolute -top-10 -right-10 w-40 h-40 rounded-2xl overflow-hidden shadow-xl animate-float">
              <img 
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=300&fit=crop" 
                alt="Room 1" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:block absolute -bottom-10 -left-10 w-32 h-32 rounded-2xl overflow-hidden shadow-xl animate-float" style={{ animationDelay: '1s' }}>
              <img 
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=300&h=300&fit=crop" 
                alt="Room 2" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center hover-lift animate-fade-in border-2 hover:border-primary transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-3xl font-bold mb-1">{stat.number}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular <span className="text-primary">Cities</span>
          </h3>
          <p className="text-lg text-muted-foreground">Explore rooms in top student cities across India</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCities.map((city, index) => (
            <Card 
              key={index}
              className="group cursor-pointer hover-lift overflow-hidden border-2 hover:border-primary transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/rooms?search=${city.name}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={city.image} 
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-2xl font-bold mb-1">{city.name}</h4>
                  <p className="text-sm opacity-90">{city.rooms}+ rooms available</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-accent/30 rounded-3xl">
        <div className="text-center mb-12 animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">StuName?</span>
          </h3>
          <p className="text-lg text-muted-foreground">The easiest way to find student-friendly rooms</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-all duration-300 hover-lift cursor-pointer animate-fade-in bg-white/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in hover-scale`} style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                  <feature.icon className={`w-10 h-10 ${feature.color}`} />
                </div>
                <h4 className="text-2xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It <span className="text-primary">Works</span>
          </h3>
          <p className="text-lg text-muted-foreground">Find your room in 3 simple steps</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center animate-fade-in group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-1 bg-primary/20">
                  <ArrowRight className="absolute right-0 -top-2 w-5 h-5 text-primary" />
                </div>
              )}
              
              <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-primary/70 text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl hover-scale transition-transform group-hover:shadow-2xl">
                <step.icon className="w-10 h-10" />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {step.number}
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20 bg-accent/20 rounded-3xl">
        <div className="text-center mb-12 animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Students <span className="text-primary">Say</span>
          </h3>
          <p className="text-lg text-muted-foreground">Real stories from real students</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="hover-lift animate-fade-in border-2 hover:border-primary transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-2 border-primary"
                  />
                  <div>
                    <h5 className="font-semibold">{testimonial.name}</h5>
                    <p className="text-sm text-muted-foreground">{testimonial.college}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-3xl p-12 shadow-2xl animate-scale-in relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Room?</h3>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join <span className="font-bold">500+</span> students who found their perfect accommodation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/auth")}
                className="text-lg px-8 hover-scale"
              >
                <Home className="mr-2" />
                I'm a Student
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover-scale border-2"
              >
                <Zap className="mr-2" />
                I'm an Owner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
