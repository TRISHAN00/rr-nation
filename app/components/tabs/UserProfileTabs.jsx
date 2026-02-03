import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Award,
  Calendar,
  Camera,
  Clock,
  DollarSign,
  Lock,
  Mail,
  MapPin,
  MapPinned,
  Phone,
  ShoppingBag,
  User,
} from "lucide-react";

export function UserProfileTabs() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-600 text-sm mt-1">
          Manage your events, profile, and security settings
        </p>
      </div>

      <Tabs defaultValue="my-events" className="w-full">
        {/* Horizontal Tab List */}
        <TabsList className="w-full justify-start border-b bg-transparent p-0 h-auto">
          <TabsTrigger
            value="my-events"
            className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <Calendar className="h-4 w-4 mr-2" />
            My Events
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <User className="h-4 w-4 mr-2" />
            Profile Settings
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* My Events Tab */}
        <TabsContent value="my-events" className="mt-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Events Joined
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-gray-600 mt-1">3 upcoming events</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Orders
                  </CardTitle>
                  <ShoppingBag className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-gray-600 mt-1">
                  All time registrations
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Spent
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$450</div>
                <p className="text-xs text-gray-600 mt-1">
                  Registration fees paid
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">All Registered Events</CardTitle>
              <CardDescription>
                Complete list of events you've joined and participated in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upcoming Events */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Upcoming Events
                </h3>
                {[
                  {
                    name: "City Marathon 2026",
                    date: "12 Feb 2026",
                    time: "6:00 AM",
                    location: "Central Park, New York",
                    distance: "10 KM",
                    registrationDate: "15 Jan 2026",
                    orderNumber: "#ORD-2026-001",
                    amount: "$45",
                    status: "Confirmed",
                  },
                  {
                    name: "Night Run Challenge",
                    date: "28 Mar 2026",
                    time: "8:00 PM",
                    location: "Brooklyn Bridge",
                    distance: "5 KM",
                    registrationDate: "20 Jan 2026",
                    orderNumber: "#ORD-2026-002",
                    amount: "$30",
                    status: "Confirmed",
                  },
                  {
                    name: "Beach Trail Run",
                    date: "15 Apr 2026",
                    time: "7:00 AM",
                    location: "Santa Monica Beach",
                    distance: "7 KM",
                    registrationDate: "28 Jan 2026",
                    orderNumber: "#ORD-2026-003",
                    amount: "$35",
                    status: "Confirmed",
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg mb-3 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base">
                          {event.name}
                        </h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            {event.distance}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                          <MapPinned className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex gap-6 text-xs text-gray-600">
                        <div>
                          <span className="text-gray-500">Order:</span>{" "}
                          <span className="font-medium text-gray-900">
                            {event.orderNumber}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Registered:</span>{" "}
                          <span className="font-medium text-gray-900">
                            {event.registrationDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Amount:</span>{" "}
                          <span className="font-medium text-gray-900">
                            {event.amount}
                          </span>
                        </div>
                      </div>
                      <button className="text-sm font-medium hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Past Events */}
              <div className="pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Past Events
                </h3>
                {[
                  {
                    name: "Charity Fun Run",
                    date: "05 Jan 2026",
                    time: "7:30 AM",
                    location: "Golden Gate Park",
                    distance: "3 KM",
                    registrationDate: "10 Dec 2025",
                    orderNumber: "#ORD-2025-045",
                    amount: "$25",
                    status: "Completed",
                  },
                  {
                    name: "Winter Marathon",
                    date: "15 Dec 2025",
                    time: "6:00 AM",
                    location: "Chicago Downtown",
                    distance: "10 KM",
                    registrationDate: "01 Nov 2025",
                    orderNumber: "#ORD-2025-032",
                    amount: "$50",
                    status: "Completed",
                  },
                  {
                    name: "Thanksgiving Turkey Trot",
                    date: "28 Nov 2025",
                    time: "8:00 AM",
                    location: "Boston Common",
                    distance: "5 KM",
                    registrationDate: "15 Oct 2025",
                    orderNumber: "#ORD-2025-021",
                    amount: "$30",
                    status: "Completed",
                  },
                  {
                    name: "Halloween Night Run",
                    date: "31 Oct 2025",
                    time: "7:00 PM",
                    location: "Portland City Center",
                    distance: "5 KM",
                    registrationDate: "05 Oct 2025",
                    orderNumber: "#ORD-2025-018",
                    amount: "$35",
                    status: "Completed",
                  },
                  {
                    name: "Fall Colors Trail Run",
                    date: "20 Oct 2025",
                    time: "9:00 AM",
                    location: "Vermont Mountains",
                    distance: "7 KM",
                    registrationDate: "25 Sep 2025",
                    orderNumber: "#ORD-2025-012",
                    amount: "$40",
                    status: "Completed",
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg mb-3 hover:bg-gray-50 transition opacity-75"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base">
                          {event.name}
                        </h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            {event.distance}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                          <MapPinned className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex gap-6 text-xs text-gray-600">
                        <div>
                          <span className="text-gray-500">Order:</span>{" "}
                          <span className="font-medium text-gray-900">
                            {event.orderNumber}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Registered:</span>{" "}
                          <span className="font-medium text-gray-900">
                            {event.registrationDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Amount:</span>{" "}
                          <span className="font-medium text-gray-900">
                            {event.amount}
                          </span>
                        </div>
                      </div>
                      <button className="text-sm font-medium hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Settings Tab */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          {/* Profile Photo */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Profile Photo</CardTitle>
              <CardDescription>
                Upload a profile picture to personalize your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm font-medium">
                    Upload Photo
                  </button>
                  <p className="text-xs text-gray-600 mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    rows={3}
                    defaultValue="123 Main Street, San Francisco, CA 94102"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    defaultValue="1990-01-15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Gender
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-medium text-sm">
                  Save Changes
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Emergency Contact</CardTitle>
              <CardDescription>
                Add an emergency contact for safety purposes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Relationship
                  </label>
                  <input
                    type="text"
                    placeholder="Spouse"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Emergency Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 987-6543"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="pt-2">
                <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-medium text-sm">
                  Save Emergency Contact
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6 space-y-6">
          {/* Change Password */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and
                  numbers
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-medium text-sm">
                  Update Password
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Forgot Password */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Forgot Password</CardTitle>
              <CardDescription>
                Reset your password if you've forgotten it
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">
                If you've forgotten your password, we'll send you a password
                reset link to your registered email address.
              </p>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    disabled
                  />
                </div>
              </div>
              <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium text-sm">
                Send Reset Link
              </button>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          {/* <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">2FA Status</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Two-factor authentication is currently disabled
                  </p>
                </div>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                  Disabled
                </span>
              </div>
              <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-medium text-sm">
                Enable 2FA
              </button>
            </CardContent>
          </Card> */}

          {/* Active Sessions */}
          {/* <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Active Sessions</CardTitle>
              <CardDescription>
                Manage devices where you're currently logged in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  device: "Chrome on MacBook Pro",
                  location: "San Francisco, CA",
                  lastActive: "Active now",
                  current: true,
                },
                {
                  device: "Safari on iPhone 15",
                  location: "San Francisco, CA",
                  lastActive: "2 hours ago",
                  current: false,
                },
              ].map((session, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {session.device}
                      {session.current && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                  {!session.current && (
                    <button className="text-sm text-red-600 hover:underline">
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}