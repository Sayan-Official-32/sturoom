import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <Navbar />
        
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FAQ;
