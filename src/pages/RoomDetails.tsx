import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Phone, MessageCircle, MapPin, DollarSign, Star, Home } from "lucide-react";

interface Room {
  id: string;
  title: string;
  description: string;
  rent: number;
  city: string;
  address: string;
  room_type: string;
  distance_from_college: number;
  amenities: string[];
}

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRoomDetails();
  }, [id]);

  const fetchRoomDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select(`*`)
        .eq("id", id)
        .single();

      if (error) throw error;
      setRoom(data);

      // Increment views
      await supabase
        .from("rooms")
        .update({ views_count: (data.views_count || 0) + 1 })
        .eq("id", id);
    } catch (error: any) {
      toast.error("Failed to load room details");
      navigate("/rooms");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCall = () => {
    toast.info("Contact information will be available soon");
  };

  const handleWhatsApp = () => {
    toast.info("Contact information will be available soon");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading room details...</p>
      </div>
    );
  }

  if (!room) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/rooms")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Rooms
            </Button>
            <h1 className="text-2xl font-bold text-primary">StuName</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Image Placeholder */}
        <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">Room Image</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{room.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{room.address}, {room.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{room.room_type}</Badge>
                    {room.distance_from_college && (
                      <Badge variant="outline">{room.distance_from_college} km from college</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <span className="text-3xl font-bold text-primary">₹{room.rent}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">per month</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {room.description && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{room.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {room.amenities?.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <Home className="h-4 w-4 text-primary" />
                      </div>
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Card */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Owner</h3>
                <div className="space-y-4">
                  <Button onClick={handleCall} className="w-full" size="lg">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Owner
                  </Button>
                  <Button onClick={handleWhatsApp} variant="outline" className="w-full" size="lg">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Book Visit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
