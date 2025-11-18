import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const navigate = useNavigate();

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
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center">Get in <span className="text-primary">Touch</span></h1>
          <p className="text-xl text-muted-foreground mb-12 text-center">Have questions? We'd love to hear from you!</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message" rows={5} />
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="hover-lift">
                <CardContent className="p-6 flex items-start gap-4">
                  <Mail className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-muted-foreground">support@stuname.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6 flex items-start gap-4">
                  <Phone className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6 flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-bold mb-1">Address</h3>
                    <p className="text-muted-foreground">Odisha, India</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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

export default Contact;
