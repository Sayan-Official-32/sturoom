import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoomCard } from "@/components/RoomCard";
import { RoomFilters } from "@/components/RoomFilters";
import { SkeletonCard } from "@/components/SkeletonCard";
import { toast } from "sonner";
import { Search, LogOut, Sliders } from "lucide-react";

interface Room {
  id: string;
  title: string;
  rent: number;
  city: string;
  address: string;
  room_type: string;
  distance_from_college: number | null;
  amenities: string[];
  average_rating: number;
  total_reviews: number;
  room_images: { image_url: string; is_primary: boolean }[];
}

const EnhancedRooms = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCity, setSelectedCity] = useState("all");
  const [roomType, setRoomType] = useState("all");
  const [maxRent, setMaxRent] = useState(50000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchRooms();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [rooms, searchQuery, selectedCity, roomType, maxRent, selectedAmenities, sortBy]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please sign in to view rooms");
      navigate("/student-auth");
    }
  };

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
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
          average_rating,
          total_reviews,
          created_at,
          room_images (image_url, is_primary)
        `)
        .eq("status", "approved")
        .eq("is_available", true);

      if (error) throw error;
      setRooms(data || []);
    } catch (error: any) {
      toast.error("Failed to load rooms");
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...rooms];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (room) =>
          room.city.toLowerCase().includes(query) ||
          room.address.toLowerCase().includes(query) ||
          room.title.toLowerCase().includes(query)
      );
    }

    // City filter
    if (selectedCity !== "all") {
      filtered = filtered.filter((room) => room.city === selectedCity);
    }

    // Room type filter
    if (roomType !== "all") {
      filtered = filtered.filter((room) => room.room_type === roomType);
    }

    // Rent filter
    filtered = filtered.filter((room) => room.rent <= maxRent);

    // Amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((room) =>
        selectedAmenities.every((amenity) => room.amenities?.includes(amenity))
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.rent - b.rent);
        break;
      case "price-high":
        filtered.sort((a, b) => b.rent - a.rent);
        break;
      case "nearest":
        filtered.sort((a, b) => {
          const distA = a.distance_from_college || 9999;
          const distB = b.distance_from_college || 9999;
          return distA - distB;
        });
        break;
      case "rating":
        filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
        break;
      default:
        // newest (already sorted by created_at desc from DB)
        break;
    }

    setFilteredRooms(filtered);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 
              className="text-2xl font-bold text-primary cursor-pointer hover-scale" 
              onClick={() => navigate("/")}
            >
              StuName
            </h1>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleLogout} className="hover-scale">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by city, area, or room title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <RoomFilters
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              roomType={roomType}
              setRoomType={setRoomType}
              maxRent={maxRent}
              setMaxRent={setMaxRent}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onApplyFilters={applyFilters}
            />
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {isLoading ? (
                "Loading rooms..."
              ) : (
                `${filteredRooms.length} ${filteredRooms.length === 1 ? "room" : "rooms"} found`
              )}
            </p>
          </div>
        </div>

        {/* Rooms Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-muted/50 rounded-full mb-6">
              <Sliders className="h-16 w-16 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No rooms found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search query
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCity("all");
                setRoomType("all");
                setMaxRent(50000);
                setSelectedAmenities([]);
                setSortBy("newest");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room, index) => (
              <div
                key={room.id}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
                className="animate-fade-in"
              >
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedRooms;
