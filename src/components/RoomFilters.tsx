import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, X } from "lucide-react";

interface RoomFiltersProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  roomType: string;
  setRoomType: (type: string) => void;
  maxRent: number;
  setMaxRent: (rent: number) => void;
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onApplyFilters: () => void;
}

export const RoomFilters = ({
  selectedCity,
  setSelectedCity,
  roomType,
  setRoomType,
  maxRent,
  setMaxRent,
  selectedAmenities,
  setSelectedAmenities,
  sortBy,
  setSortBy,
  onApplyFilters,
}: RoomFiltersProps) => {
  const [open, setOpen] = useState(false);

  const amenitiesList = [
    "WiFi",
    "Parking",
    "Water 24/7",
    "Electricity",
    "Furnished",
    "AC",
    "Attached Bathroom",
    "Mess/Tiffin",
  ];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(
      selectedAmenities.includes(amenity)
        ? selectedAmenities.filter((a) => a !== amenity)
        : [...selectedAmenities, amenity]
    );
  };

  const clearFilters = () => {
    setSelectedCity("all");
    setRoomType("all");
    setMaxRent(50000);
    setSelectedAmenities([]);
    setSortBy("newest");
  };

  const hasActiveFilters =
    selectedCity !== "all" ||
    roomType !== "all" ||
    maxRent < 50000 ||
    selectedAmenities.length > 0 ||
    sortBy !== "newest";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              !
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Filters</span>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Sort By */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="nearest">Nearest to College</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label>City</Label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Kolkata">Kolkata</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Room Type */}
          <div className="space-y-2">
            <Label>Room Type</Label>
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
          </div>

          {/* Max Rent Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Maximum Rent</Label>
              <span className="text-sm font-semibold text-primary">
                ₹{maxRent.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[maxRent]}
              onValueChange={(values) => setMaxRent(values[0])}
              min={1000}
              max={50000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹1,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-3">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <label
                    htmlFor={amenity}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <Button
            className="w-full"
            onClick={() => {
              onApplyFilters();
              setOpen(false);
            }}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
