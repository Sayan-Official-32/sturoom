import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Star, Wifi, Car, Droplet, Zap, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface RoomCardProps {
  room: {
    id: string;
    title: string;
    rent: number;
    city: string;
    address: string;
    room_type: string;
    distance_from_college: number | null;
    amenities: string[];
    average_rating?: number;
    total_reviews?: number;
    room_images: { image_url: string; is_primary: boolean }[];
  };
}

export const RoomCard = ({ room }: RoomCardProps) => {
  const navigate = useNavigate();
  const primaryImage = room.room_images?.find((img) => img.is_primary) || room.room_images?.[0];

  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, any> = {
      wifi: Wifi,
      parking: Car,
      "water 24/7": Droplet,
      electricity: Zap,
    };
    const Icon = icons[amenity.toLowerCase()];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer group hover-scale transition-all duration-300 hover:shadow-xl animate-fade-in"
      onClick={() => navigate(`/room/${room.id}`)}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {primaryImage ? (
          <img
            src={primaryImage.image_url}
            alt={room.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">No image</p>
          </div>
        )}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Add bookmark functionality
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {room.title}
        </h3>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-1">
            {room.address}, {room.city}
          </span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary">{room.room_type}</Badge>
          {room.distance_from_college && (
            <Badge variant="outline" className="text-xs">
              {room.distance_from_college} km
            </Badge>
          )}
          {room.total_reviews && room.total_reviews > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{room.average_rating?.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Amenities */}
        {room.amenities && room.amenities.length > 0 && (
          <div className="flex items-center gap-3 text-muted-foreground">
            {room.amenities.slice(0, 4).map((amenity) => (
              <div key={amenity} title={amenity}>
                {getAmenityIcon(amenity)}
              </div>
            ))}
            {room.amenities.length > 4 && (
              <span className="text-xs">+{room.amenities.length - 4}</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-baseline gap-1">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold text-primary">₹{room.rent.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
