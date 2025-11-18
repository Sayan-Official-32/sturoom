import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { CheckCircle, XCircle, Eye, ArrowLeft } from "lucide-react";

interface Room {
  id: string;
  title: string;
  rent: number;
  city: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [pendingRooms, setPendingRooms] = useState<Room[]>([]);
  const [approvedRooms, setApprovedRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAdminAuth();
    fetchRooms();
  }, []);

  const checkAdminAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in");
      navigate("/");
      return;
    }

    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!data) {
      toast.error("Admin access required");
      navigate("/");
    }
  };

  const fetchRooms = async () => {
    try {
      const { data: pending } = await supabase
        .from("rooms")
        .select(`
          id,
          title,
          rent,
          city,
          status,
          created_at
        `)
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      const { data: approved } = await supabase
        .from("rooms")
        .select(`
          id,
          title,
          rent,
          city,
          status,
          created_at
        `)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      setPendingRooms(pending || []);
      setApprovedRooms(approved || []);
    } catch (error: any) {
      toast.error("Failed to load rooms");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (roomId: string) => {
    try {
      const { error } = await supabase
        .from("rooms")
        .update({ status: "approved" })
        .eq("id", roomId);

      if (error) throw error;
      toast.success("Room approved!");
      fetchRooms();
    } catch (error: any) {
      toast.error("Failed to approve room");
    }
  };

  const handleReject = async (roomId: string) => {
    try {
      const { error } = await supabase
        .from("rooms")
        .update({ status: "rejected" })
        .eq("id", roomId);

      if (error) throw error;
      toast.success("Room rejected");
      fetchRooms();
    } catch (error: any) {
      toast.error("Failed to reject room");
    }
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
            <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pending">
              Pending ({pendingRooms.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedRooms.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-8">
            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : pendingRooms.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No pending rooms</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingRooms.map((room) => (
                  <Card key={room.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-lg line-clamp-2">{room.title}</h3>
                        <Badge variant="outline">{room.status}</Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground">
                          City: {room.city}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          ₹{room.rent}/month
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => navigate(`/room/${room.id}`)}
                          variant="outline"
                          className="flex-1"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleApprove(room.id)}
                          variant="default"
                          className="flex-1"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(room.id)}
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved" className="mt-8">
            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : approvedRooms.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No approved rooms yet</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedRooms.map((room) => (
                  <Card key={room.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-lg line-clamp-2">{room.title}</h3>
                        <Badge variant="secondary">{room.status}</Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground">
                          City: {room.city}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          ₹{room.rent}/month
                        </p>
                      </div>
                      <Button
                        onClick={() => navigate(`/room/${room.id}`)}
                        variant="outline"
                        className="w-full"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
