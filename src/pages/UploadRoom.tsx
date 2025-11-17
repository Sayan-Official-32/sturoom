import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ArrowLeft, Upload, Home } from "lucide-react";

const UploadRoom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    city: "",
    address: "",
    roomType: "single" as "single" | "shared" | "pg" | "flat",
    distanceFromCollege: "",
    collegeId: "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);

  const amenitiesList = ["WiFi", "Parking", "Water 24/7", "Electricity", "Furnished", "AC", "Geyser", "Security"];

  useEffect(() => {
    checkAuth();
    fetchColleges();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please sign in as an owner");
      navigate("/owner-auth");
    }
  };

  const fetchColleges = async () => {
    const { data } = await supabase.from("colleges").select("*");
    setColleges(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("rooms")
        .insert({
          owner_id: user.id,
          title: formData.title,
          description: formData.description,
          rent: parseFloat(formData.rent),
          city: formData.city,
          address: formData.address,
          room_type: formData.roomType,
          distance_from_college: formData.distanceFromCollege ? parseFloat(formData.distanceFromCollege) : null,
          college_id: formData.collegeId || null,
          amenities: selectedAmenities,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Room submitted for approval!");
      navigate("/rooms");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload room");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-primary">StuName - Upload Room</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Home className="h-6 w-6 text-primary" />
              List Your Room
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Room Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Spacious Single Room Near IIT Delhi"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your room, facilities, rules, etc."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Rent and Room Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rent">Monthly Rent (₹) *</Label>
                  <Input
                    id="rent"
                    type="number"
                    placeholder="8000"
                    value={formData.rent}
                    onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomType">Room Type *</Label>
                  <Select
                    value={formData.roomType}
                    onValueChange={(value: any) => setFormData({ ...formData, roomType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="shared">Shared</SelectItem>
                      <SelectItem value="pg">PG</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* City and Address */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Delhi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Hauz Khas, South Delhi"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* College and Distance */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="college">Nearest College</Label>
                  <Select value={formData.collegeId} onValueChange={(value) => setFormData({ ...formData, collegeId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select college" />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem key={college.id} value={college.id}>
                          {college.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance from College (km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    step="0.1"
                    placeholder="1.5"
                    value={formData.distanceFromCollege}
                    onChange={(e) => setFormData({ ...formData, distanceFromCollege: e.target.value })}
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <Label htmlFor={amenity} className="cursor-pointer">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit for Approval"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Your room will be reviewed by our admin team and published within 24 hours.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadRoom;
