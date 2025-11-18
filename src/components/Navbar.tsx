import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Download } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
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
            
            {/* Separator */}
            <div className="h-6 w-px bg-border mx-2"></div>
            
            {/* Download App Button - Special Style */}
            <Button 
              variant="outline" 
              onClick={() => navigate("/download-app")}
              className="hover-scale border-2 border-primary/50 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              size="sm"
            >
              <Download className="mr-1 h-4 w-4" />
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
  );
};

export default Navbar;
