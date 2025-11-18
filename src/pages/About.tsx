import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Target, Heart, Home, Download } from "lucide-react";
import Navbar from "@/components/Navbar";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background">
      {/* Navbar */}
      <Navbar />

      {/* About Content */}
      <div className="container mx-auto px-4 py-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-8 hover-scale"
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6 animate-fade-in">
            About <span className="text-primary">StuName</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in">
            Connecting students with affordable rooms, without brokers.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-accent/30 rounded-xl hover-lift">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                Help students find safe, affordable accommodation near their college
              </p>
            </div>
            <div className="text-center p-6 bg-accent/30 rounded-xl hover-lift">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-muted-foreground">
                Remove broker barriers and create direct student-owner connections
              </p>
            </div>
            <div className="text-center p-6 bg-accent/30 rounded-xl hover-lift">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Values</h3>
              <p className="text-muted-foreground">
                Transparency, affordability, and student-first approach
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-4">Why We Started</h2>
            <p className="text-muted-foreground mb-6">
              As students ourselves, we experienced the struggle of finding affordable rooms 
              near college. Brokers charged hefty fees, and the process was frustrating and opaque.
            </p>
            
            <h2 className="text-3xl font-bold mb-4 mt-12">What Makes Us Different</h2>
            <ul className="text-muted-foreground space-y-3">
              <li>✅ <strong>No Broker Fees</strong> - Direct connection between students and owners</li>
              <li>✅ <strong>Verified Listings</strong> - All rooms are verified by our team</li>
              <li>✅ <strong>Location-Based Search</strong> - Find rooms near your college or hospital</li>
              <li>✅ <strong>Budget Friendly</strong> - Rooms designed for student budgets</li>
            </ul>
          </div>
        </div>
      </div>

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

export default About;
