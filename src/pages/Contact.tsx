import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background">
      {/* Navbar */}
        <Navbar />

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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
