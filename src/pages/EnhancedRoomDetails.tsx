import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageGallery } from "@/components/ImageGallery";
import { toast } from "sonner";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  MapPin,
  DollarSign,
  Star,
  Home,
  Check,
  Wifi,
  Car,
  Droplet,
  Zap,
  Wind,
  Utensils,
  Shield,
  Bath,
  Loader2,
} from "lucide-react";

interface Room {
  id: string;
  title: string;
  description: string;
  rent: number;
  deposit: number | null;
  city: string;
  address: string;
  room_type: string;
  distance_from_college: number | null;
  amenities: string[];
  has_attached_bathroom: boolean;
  is_furnished: boolean;
  has_ac: boolean;
  has_mess: boolean;
  owner_name: string | null;
  owner_phone: string | null;
  owner_whatsapp: string | null;
  nearby_landmarks: string | null;
  room_rules: string | null;
  average_rating: number;
  total_reviews: number;
  room_images: { image_url: string; is_primary: boolean }[];
  colleges: { name: string } | null;
}

const EnhancedRoomDetails = () => {
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
        .select(`
          *,
          room_images (image_url, is_primary),
          colleges (name)
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast.error("Room not found");
        navigate("/rooms");
        return;
      }
      
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
    if (room?.owner_phone) {
      window.location.href = `tel:${room.owner_phone}`;
    } else {
      toast.error("Contact number not available");
    }
  };

  const handleWhatsApp = () => {
    const phone = room?.owner_whatsapp || room?.owner_phone;
    if (phone) {
      const cleanPhone = phone.replace(/[^0-9]/g, "");
      window.open(`https://wa.me/${cleanPhone}`, "_blank");
    } else {
      toast.error("WhatsApp number not available");
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, any> = {
      wifi: Wifi,
      parking: Car,
      "water 24/7": Droplet,
      electricity: Zap,
      security: Shield,
    };
    const Icon = icons[amenity.toLowerCase()];
    return Icon ? <Icon className="h-5 w-5" /> : <Check className="h-5 w-5" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!room) return null;

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/rooms")} className="hover-scale">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Rooms
            </Button>
            <h1 className="text-2xl font-bold text-primary">StuName</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Image Gallery */}
        <div className="mb-8 animate-scale-in">
          <ImageGallery images={room.room_images || []} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Basic Info */}
            <Card className="animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-3">{room.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-5 w-5" />
                      <span className="text-lg">{room.address}, {room.city}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="secondary" className="text-base px-3 py-1">
                        {room.room_type}
                      </Badge>
                      {room.distance_from_college && (
                        <Badge variant="outline" className="text-base px-3 py-1">
                          {room.distance_from_college} km from {room.colleges?.name || "college"}
                        </Badge>
                      )}
                      {room.total_reviews > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{room.average_rating.toFixed(1)}</span>
                          <span className="text-muted-foreground">({room.total_reviews} reviews)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <DollarSign className="h-7 w-7 text-primary" />
                  <span className="text-4xl font-bold text-primary">₹{room.rent.toLocaleString()}</span>
                  <span className="text-xl text-muted-foreground">/month</span>
                </div>

                {room.deposit && (
                  <p className="text-muted-foreground">
                    Security Deposit: <span className="font-semibold">₹{room.deposit.toLocaleString()}</span>
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            {room.description && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {room.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Room Features */}
            <Card className="animate-fade-in">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Room Features</h2>
                <div className="grid grid-cols-2 gap-4">
                  {room.has_attached_bathroom && (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Bath className="h-6 w-6 text-primary" />
                      <span className="font-medium">Attached Bathroom</span>
                    </div>
                  )}
                  {room.is_furnished && (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Home className="h-6 w-6 text-primary" />
                      <span className="font-medium">Furnished</span>
                    </div>
                  )}
                  {room.has_ac && (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Wind className="h-6 w-6 text-primary" />
                      <span className="font-medium">AC</span>
                    </div>
                  )}
                  {room.has_mess && (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Utensils className="h-6 w-6 text-primary" />
                      <span className="font-medium">Mess/Tiffin</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {room.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        {getAmenityIcon(amenity)}
                        <span className="font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Nearby Landmarks */}
            {room.nearby_landmarks && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Nearby Landmarks</h2>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {room.nearby_landmarks}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Room Rules */}
            {room.room_rules && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Room Rules</h2>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {room.room_rules}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Contact Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 animate-scale-in">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-xl font-bold mb-4">Contact Owner</h3>
                
                {room.owner_name && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Owner</p>
                    <p className="font-semibold text-lg">{room.owner_name}</p>
                  </div>
                )}

                <Button className="w-full h-12 text-lg hover-scale" onClick={handleCall}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>

                <Button variant="outline" className="w-full h-12 text-lg hover-scale" onClick={handleWhatsApp}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    Contact the owner directly to schedule a visit and get more details about the room.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedRoomDetails;
