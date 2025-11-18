import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Upload, Users, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

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
        <Navbar />

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
