import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "Is there any broker fee?",
      answer: "No! StuName connects you directly with room owners. There are absolutely no broker fees or hidden charges.",
    },
    {
      question: "How do I contact the owner?",
      answer: "Once you find a room you like, you can directly call or WhatsApp the owner using the contact details provided in the listing.",
    },
    {
      question: "Are the rooms verified?",
      answer: "Yes, our team verifies all room listings to ensure authenticity and quality.",
    },
    {
      question: "Can I list my room for free?",
      answer: "Absolutely! Listing your room on StuName is completely free. No listing fees or commissions.",
    },
    {
      question: "What cities do you cover?",
      answer: "We are expanding rapidly! Currently, we cover major college cities across India. Search by your college name to find available rooms.",
    },
    {
      question: "How do I report a fake listing?",
      answer: "You can report any suspicious listing through the contact us page or by emailing our support team.",
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center">Frequently Asked <span className="text-primary">Questions</span></h1>
          <p className="text-xl text-muted-foreground mb-12 text-center">Find answers to common questions about StuName</p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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

export default FAQ;
