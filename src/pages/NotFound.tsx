import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-accent/50 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated 404 Number */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 leading-none animate-bounce-slow">
              404
            </h1>
          </div>

          {/* Icon */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <AlertCircle className="w-12 h-12 text-primary animate-pulse" />
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-muted-foreground">
              Attempted path: <code className="bg-accent px-2 py-1 rounded text-primary">{location.pathname}</code>
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for rooms..."
                  className="pl-10 h-12"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      navigate(`/?search=${(e.target as HTMLInputElement).value}`);
                    }
                  }}
                />
              </div>
              <Button 
                size="lg" 
                className="hover-scale"
                onClick={() => navigate('/')}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button 
              size="lg" 
              onClick={() => navigate(-1)}
              variant="outline"
              className="hover-scale group border-2 hover:border-primary transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1 rounded-full group-hover:bg-primary/20 transition-colors">
                  <ArrowLeft className="h-4 w-4 text-primary group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="font-semibold">Go Back</span>
              </div>
            </Button>

            <Button 
              size="lg" 
              onClick={() => navigate('/')}
              className="hover-scale"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-sm text-muted-foreground mb-4">Or try these popular pages:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/for-buyer')}
                className="hover:text-primary hover:bg-primary/5"
              >
                For Buyers
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/for-seller')}
                className="hover:text-primary hover:bg-primary/5"
              >
                For Sellers
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/about')}
                className="hover:text-primary hover:bg-primary/5"
              >
                About Us
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/contact')}
                className="hover:text-primary hover:bg-primary/5"
              >
                Contact Us
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/faq')}
                className="hover:text-primary hover:bg-primary/5"
              >
                FAQ
              </Button>
            </div>
          </div>

          {/* Fun Message */}
          <div className="mt-12 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <p className="text-sm text-muted-foreground italic">
              🏠 Lost? Don't worry, finding the right room shouldn't be this hard! 😊
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
