import { useNavigate } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Youtube,
  Github,
  MessageCircle,
  Clock,
  Shield,
  Award,
  Users,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-accent/20 border-t border-border mt-20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Home className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-primary">StuName</h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              India's #1 student accommodation platform. Connecting students with verified, affordable rooms near colleges and universities. No broker fees, no hidden charges - just transparent, student-friendly housing solutions.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div>
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-xs text-muted-foreground">Rooms Listed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-xs text-muted-foreground">Happy Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-xs text-muted-foreground">Cities Covered</div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-sm font-semibold mb-3">Follow Us</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hover-scale hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={() => window.open('https://facebook.com', '_blank')}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hover-scale hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={() => window.open('https://twitter.com', '_blank')}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hover-scale hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={() => window.open('https://instagram.com', '_blank')}
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hover-scale hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hover-scale hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={() => window.open('https://youtube.com', '_blank')}
                >
                  <Youtube className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hover-scale hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={() => window.open('https://github.com', '_blank')}
                >
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              For Students
            </h3>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => navigate("/")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/for-buyer")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Search Rooms
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/student-auth")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Student Login
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/about")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/download-app")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Download App
                </button>
              </li>
              <li>
                <button 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              For Owners
            </h3>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => navigate("/for-seller")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → List Your Property
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/owner-auth")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Owner Login
                </button>
              </li>
              <li>
                <button 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Pricing Plans
                </button>
              </li>
              <li>
                <button 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Owner Benefits
                </button>
              </li>
              <li>
                <button 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Success Stories
                </button>
              </li>
              <li>
                <button 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Owner Guidelines
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Support
            </h3>
            <ul className="space-y-2.5 mb-6">
              <li>
                <button 
                  onClick={() => navigate("/faq")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/contact")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Contact Us
                </button>
              </li>
              <li>
                <button 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Help Center
                </button>
              </li>
              <li>
                <button 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Report Issue
                </button>
              </li>
              <li>
                <button 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Safety Guidelines
                </button>
              </li>
              <li>
                <button 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  → Trust & Safety
                </button>
              </li>
            </ul>

            {/* Contact Info Compact */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3 text-primary" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Award className="h-3 w-3 text-primary" />
                <span>Verified Platform</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Contact Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg hover-lift">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">Email Support</p>
              <a href="mailto:support@stuname.com" className="text-sm text-muted-foreground hover:text-primary">
                support@stuname.com
              </a>
              <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg hover-lift">
            <Phone className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">Call Us</p>
              <a href="tel:+919876543210" className="text-sm text-muted-foreground hover:text-primary">
                +91 98765 43210
              </a>
              <p className="text-xs text-muted-foreground mt-1">Mon-Sat, 9 AM - 6 PM IST</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg hover-lift">
            <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">WhatsApp</p>
              <a href="https://wa.me/919876543210" className="text-sm text-muted-foreground hover:text-primary">
                Chat with us
              </a>
              <p className="text-xs text-muted-foreground mt-1">Instant response</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="space-y-4">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </button>
            <span className="text-muted-foreground">•</span>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Terms & Conditions
            </button>
            <span className="text-muted-foreground">•</span>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Refund Policy
            </button>
            <span className="text-muted-foreground">•</span>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </button>
            <span className="text-muted-foreground">•</span>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Sitemap
            </button>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 <span className="font-semibold text-primary">StuName</span>. All rights reserved. 
              <span className="mx-2">|</span>
              Made with <span className="text-red-500">❤️</span> for Students in India
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              <MapPin className="h-3 w-3 inline mr-1" />
              Headquartered in Odisha, India • Serving students nationwide
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4 text-green-500" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Award className="h-4 w-4 text-yellow-500" />
              <span>Verified Platform</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-4 w-4 text-blue-500" />
              <span>500+ Happy Students</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
