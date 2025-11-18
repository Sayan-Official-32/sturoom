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
import { ImageUpload } from "@/components/ImageUpload";

const UploadRoom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    deposit: "",
    city: "",
    address: "",
    roomType: "single" as "single" | "shared" | "pg" | "flat",
    distanceFromCollege: "",
    collegeId: "",
    ownerName: "",
    ownerPhone: "",
    ownerWhatsapp: "",
    roomRules: "",
    hasAc: false,
    hasAttachedBathroom: false,
    hasMess: false,
    isFurnished: false,
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [images, setImages] = useState<File[]>([]);

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

      // Insert room data
      const { data: room, error: roomError } = await supabase
        .from("rooms")
        .insert({
          owner_id: user.id,
          title: formData.title,
          description: formData.description,
          rent: parseFloat(formData.rent),
          deposit: formData.deposit ? parseFloat(formData.deposit) : null,
          city: formData.city,
          address: formData.address,
          room_type: formData.roomType,
          distance_from_college: formData.distanceFromCollege ? parseFloat(formData.distanceFromCollege) : null,
          college_id: formData.collegeId || null,
          amenities: selectedAmenities,
          owner_name: formData.ownerName || null,
          owner_phone: formData.ownerPhone || null,
          owner_whatsapp: formData.ownerWhatsapp || null,
          room_rules: formData.roomRules || null,
          has_ac: formData.hasAc,
          has_attached_bathroom: formData.hasAttachedBathroom,
          has_mess: formData.hasMess,
          is_furnished: formData.isFurnished,
          status: "pending",
        })
        .select()
        .single();

      if (roomError) throw roomError;

      // Upload images if any
      if (images.length > 0 && room) {
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${room.id}/${Date.now()}_${i}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('room-images')
            .upload(fileName, file);

          if (uploadError) {
            console.error('Image upload error:', uploadError);
            continue;
          }

          const { data: { publicUrl } } = supabase.storage
            .from('room-images')
            .getPublicUrl(fileName);

          await supabase.from('room_images').insert({
            room_id: room.id,
            image_url: publicUrl,
            is_primary: i === 0,
          });
        }
      }

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

              {/* Additional Information */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                
                {/* Deposit */}
                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit (₹)</Label>
                  <Input
                    id="deposit"
                    type="number"
                    placeholder="10000"
                    value={formData.deposit}
                    onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                  />
                </div>

                {/* Room Features Checkboxes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasAc"
                      checked={formData.hasAc}
                      onCheckedChange={(checked) => setFormData({ ...formData, hasAc: checked as boolean })}
                    />
                    <Label htmlFor="hasAc" className="cursor-pointer">Has AC</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasAttachedBathroom"
                      checked={formData.hasAttachedBathroom}
                      onCheckedChange={(checked) => setFormData({ ...formData, hasAttachedBathroom: checked as boolean })}
                    />
                    <Label htmlFor="hasAttachedBathroom" className="cursor-pointer">Attached Bathroom</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasMess"
                      checked={formData.hasMess}
                      onCheckedChange={(checked) => setFormData({ ...formData, hasMess: checked as boolean })}
                    />
                    <Label htmlFor="hasMess" className="cursor-pointer">Has Mess</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isFurnished"
                      checked={formData.isFurnished}
                      onCheckedChange={(checked) => setFormData({ ...formData, isFurnished: checked as boolean })}
                    />
                    <Label htmlFor="isFurnished" className="cursor-pointer">Furnished</Label>
                  </div>
                </div>

                {/* Room Rules */}
                <div className="space-y-2">
                  <Label htmlFor="roomRules">Room Rules</Label>
                  <Textarea
                    id="roomRules"
                    placeholder="e.g., No smoking, No pets, Visitors allowed till 9 PM"
                    rows={3}
                    value={formData.roomRules}
                    onChange={(e) => setFormData({ ...formData, roomRules: e.target.value })}
                  />
                </div>
              </div>

              {/* Owner Contact Information */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-lg font-semibold">Owner Contact Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input
                      id="ownerName"
                      placeholder="John Doe"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerPhone">Owner Phone</Label>
                    <Input
                      id="ownerPhone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.ownerPhone}
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerWhatsapp">WhatsApp Number</Label>
                  <Input
                    id="ownerWhatsapp"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.ownerWhatsapp}
                    onChange={(e) => setFormData({ ...formData, ownerWhatsapp: e.target.value })}
                  />
                </div>
              </div>

              {/* Room Images Upload */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-lg font-semibold">Room Photos</h3>
                <ImageUpload images={images} onImagesChange={setImages} maxImages={10} />
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
