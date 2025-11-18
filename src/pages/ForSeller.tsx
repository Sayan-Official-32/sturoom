import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Upload, Users, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ForSeller = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Users,
      title: "Reach Students Directly",
      description: "Connect with verified students looking for rooms",
    },
    {
      icon: Zap,
      title: "List in Minutes",
      description: "Quick and easy room listing process",
    },
    {
      icon: TrendingUp,
      title: "Zero Commission",
      description: "Keep 100% of your rental income",
    },
  ];

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

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">List Your Room <span className="text-primary">for Free</span></h1>
          <p className="text-xl text-muted-foreground mb-8">Reach thousands of students without paying broker commissions</p>
          <Button size="lg" onClick={() => navigate("/owner-auth")} className="hover-scale">
            <Upload className="mr-2" />List Your Property
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
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

      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 StuName. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ForSeller;
