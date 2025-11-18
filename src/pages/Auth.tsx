import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Home, ArrowLeft, Mail, Lock, Phone, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Auth = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"student" | "owner" | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  // Student Form States
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    password: "",
    confirmPassword: "",
  });

  // Owner Form States
  const [ownerData, setOwnerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyCount: "",
    password: "",
    confirmPassword: "",
  });

  const handleStudentLogin = () => {
    console.log("Student Login:", studentData);
    // Add your login logic here
  };

  const handleStudentSignup = () => {
    console.log("Student Signup:", studentData);
    // Add your signup logic here
  };

  const handleOwnerLogin = () => {
    console.log("Owner Login:", ownerData);
    // Add your login logic here
  };

  const handleOwnerSignup = () => {
    console.log("Owner Signup:", ownerData);
    // Add your signup logic here
  };

  // Role Selection Screen
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background">
        <Navbar />
        
        <div className="container mx-auto px-4 py-20">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-8 hover-scale"
          >
            <ArrowLeft className="mr-2" />
            Back to Home
          </Button>

          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Join <span className="text-primary">StuRoom</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in">
              Choose how you want to continue
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Card */}
            <Card 
              className="cursor-pointer hover-lift border-2 hover:border-primary transition-all duration-300 animate-fade-in"
              onClick={() => setUserType("student")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">I'm a Student</h2>
                <p className="text-muted-foreground mb-6">
                  Looking for affordable rooms near my college or university
                </p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    Search verified rooms
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    Direct contact with owners
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    No broker fees
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    Save favorite rooms
                  </li>
                </ul>
                <Button className="w-full hover-scale" size="lg">
                  Continue as Student
                </Button>
              </CardContent>
            </Card>

            {/* Owner Card */}
            <Card 
              className="cursor-pointer hover-lift border-2 hover:border-primary transition-all duration-300 animate-fade-in"
              onClick={() => setUserType("owner")}
              style={{ animationDelay: '0.1s' }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Home className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">I'm an Owner</h2>
                <p className="text-muted-foreground mb-6">
                  Want to list my property and connect with students
                </p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    List unlimited properties
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    Reach thousands of students
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    Zero commission
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    Manage bookings easily
                  </li>
                </ul>
                <Button className="w-full hover-scale" size="lg">
                  Continue as Owner
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Auth Form Screen (After role selection)
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <Button 
          variant="ghost" 
          onClick={() => setUserType(null)}
          className="mb-8 hover-scale"
        >
          <ArrowLeft className="mr-2" />
          Change Role
        </Button>

        <div className="max-w-md mx-auto">
          <Card className="animate-fade-in">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {userType === "student" ? (
                  <User className="w-8 h-8 text-primary" />
                ) : (
                  <Home className="w-8 h-8 text-primary" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {userType === "student" ? "Student" : "Owner"} Account
              </CardTitle>
              <CardDescription>
                {isLogin ? "Welcome back! Please login to continue" : "Create your account to get started"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={isLogin ? "login" : "signup"} onValueChange={(v) => setIsLogin(v === "login")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Student Forms */}
                {userType === "student" && (
                  <>
                    <TabsContent value="login" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="student-login-email"
                            type="email"
                            placeholder="your.email@college.edu"
                            className="pl-10"
                            value={studentData.email}
                            onChange={(e) => setStudentData({...studentData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student-login-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="student-login-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={studentData.password}
                            onChange={(e) => setStudentData({...studentData, password: e.target.value})}
                          />
                        </div>
                      </div>

                      <Button className="w-full hover-scale" onClick={handleStudentLogin}>
                        Login as Student
                      </Button>

                      <p className="text-center text-sm text-muted-foreground">
                        <button className="text-primary hover:underline">
                          Forgot password?
                        </button>
                      </p>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-signup-name">Full Name</Label>
                        <Input
                          id="student-signup-name"
                          placeholder="John Doe"
                          value={studentData.name}
                          onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student-signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="student-signup-email"
                            type="email"
                            placeholder="your.email@college.edu"
                            className="pl-10"
                            value={studentData.email}
                            onChange={(e) => setStudentData({...studentData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student-signup-phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="student-signup-phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="pl-10"
                            value={studentData.phone}
                            onChange={(e) => setStudentData({...studentData, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student-signup-college">College/University</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="student-signup-college"
                            placeholder="IIT Delhi"
                            className="pl-10"
                            value={studentData.college}
                            onChange={(e) => setStudentData({...studentData, college: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student-signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="student-signup-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={studentData.password}
                            onChange={(e) => setStudentData({...studentData, password: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student-signup-confirm">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="student-signup-confirm"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={studentData.confirmPassword}
                            onChange={(e) => setStudentData({...studentData, confirmPassword: e.target.value})}
                          />
                        </div>
                      </div>

                      <Button className="w-full hover-scale" onClick={handleStudentSignup}>
                        Create Student Account
                      </Button>
                    </TabsContent>
                  </>
                )}

                {/* Owner Forms */}
                {userType === "owner" && (
                  <>
                    <TabsContent value="login" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="owner-login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="owner-login-email"
                            type="email"
                            placeholder="owner@example.com"
                            className="pl-10"
                            value={ownerData.email}
                            onChange={(e) => setOwnerData({...ownerData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="owner-login-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="owner-login-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={ownerData.password}
                            onChange={(e) => setOwnerData({...ownerData, password: e.target.value})}
                          />
                        </div>
                      </div>

                      <Button className="w-full hover-scale" onClick={handleOwnerLogin}>
                        Login as Owner
                      </Button>

                      <p className="text-center text-sm text-muted-foreground">
                        <button className="text-primary hover:underline">
                          Forgot password?
                        </button>
                      </p>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="owner-signup-name">Full Name / Business Name</Label>
                        <Input
                          id="owner-signup-name"
                          placeholder="John Doe / ABC Properties"
                          value={ownerData.name}
                          onChange={(e) => setOwnerData({...ownerData, name: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="owner-signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="owner-signup-email"
                            type="email"
                            placeholder="owner@example.com"
                            className="pl-10"
                            value={ownerData.email}
                            onChange={(e) => setOwnerData({...ownerData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="owner-signup-phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="owner-signup-phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="pl-10"
                            value={ownerData.phone}
                            onChange={(e) => setOwnerData({...ownerData, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="owner-signup-address">Property Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="owner-signup-address"
                            placeholder="City, State"
                            className="pl-10"
                            value={ownerData.address}
                            onChange={(e) => setOwnerData({...ownerData, address: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="owner-signup-properties">Number of Properties</Label>
                        <Input
                          id="owner-signup-properties"
                          type="number"
                          placeholder="1"
                          value={ownerData.propertyCount}
                          onChange={(e) => setOwnerData({...ownerData, propertyCount: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="owner-signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="owner-signup-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={ownerData.password}
                            onChange={(e) => setOwnerData({...ownerData, password: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="owner-signup-confirm">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="owner-signup-confirm"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={ownerData.confirmPassword}
                            onChange={(e) => setOwnerData({...ownerData, confirmPassword: e.target.value})}
                          />
                        </div>
                      </div>

                      <Button className="w-full hover-scale" onClick={handleOwnerSignup}>
                        Create Owner Account
                      </Button>
                    </TabsContent>
                  </>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
