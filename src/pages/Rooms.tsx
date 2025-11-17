import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Search, LogOut, MapPin, DollarSign, Wifi, Car, Droplet, Zap, Heart } from "lucide-react";

interface Room {
  id: string;
  title: string;
  rent: number;
  city: string;
  address: string;
  room_type: string;
  distance_from_college: number;
  amenities: string[];
  room_images: { image_url: string; is_primary: boolean }[];
}

const Rooms = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCity, setSelectedCity] = useState("all");
  const [roomType, setRoomType] = useState("all");
  const [maxRent, setMaxRent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchRooms();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please sign in to view rooms");
      navigate("/student-auth");
    }
  };

  const fetchRooms = async () => {
    try {
      let query = supabase
        .from("rooms")
        .select(`
          id,
          title,
          rent,
          city,
          address,
          room_type,
          distance_from_college,
          amenities,
          room_images (image_url, is_primary)
        `)
        .eq("status", "approved")
        .eq("is_available", true);

      if (searchQuery) {
        query = query.or(`city.ilike.%${searchQuery}%,address.ilike.%${searchQuery}%`);
      }
      if (selectedCity && selectedCity !== "all") {
        query = query.eq("city", selectedCity);
      }
      if (roomType && roomType !== "all" && ["single", "shared", "pg", "flat"].includes(roomType)) {
        query = query.eq("room_type", roomType as "single" | "shared" | "pg" | "flat");
      }
      if (maxRent && !isNaN(parseFloat(maxRent))) {
        query = query.lte("rent", parseFloat(maxRent));
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      setRooms(data || []);
    } catch (error: any) {
      toast.error("Failed to load rooms");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: any = {
      wifi: Wifi,
      parking: Car,
      water: Droplet,
      electricity: Zap,
    };
    const Icon = icons[amenity.toLowerCase()] || null;
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>
              StuName
            </h1>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by city or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger>
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="shared">Shared</SelectItem>
                  <SelectItem value="pg">PG</SelectItem>
                  <SelectItem value="flat">Flat</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={fetchRooms} className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading rooms...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No rooms found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Card
                key={room.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/room/${room.id}`)}
              >
                <div className="aspect-video bg-muted relative">
                  {room.room_images?.[0] ? (
                    <img
                      src={room.room_images[0].image_url}
                      alt={room.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-muted-foreground">No image</p>
                    </div>
                  )}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success("Added to bookmarks!");
                    }}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{room.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{room.address}, {room.city}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold text-primary">₹{room.rent}</span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                    <Badge variant="secondary">{room.room_type}</Badge>
                  </div>
                  {room.distance_from_college && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {room.distance_from_college} km from college
                    </p>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    {room.amenities?.slice(0, 3).map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {getAmenityIcon(amenity)}
                        <span className="ml-1">{amenity}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
