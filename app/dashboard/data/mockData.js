export const mockEvents = [
  {
    id: "1",
    name: "City Marathon 2025",
    date: "2025-03-15",
    time: "07:00 AM",
    type: "10km",
    registrationStatus: "Confirmed",
    paymentStatus: "Paid",
    location: "Central Park",
    ticketId: "TKT-001-2025",
  },
  {
    id: "2",
    name: "Spring Fun Run",
    date: "2025-04-20",
    time: "08:30 AM",
    type: "5km",
    registrationStatus: "Confirmed",
    paymentStatus: "Paid",
    location: "Riverside Trail",
    ticketId: "TKT-002-2025",
  },
  {
    id: "3",
    name: "Running Techniques Workshop",
    date: "2025-02-28",
    time: "10:00 AM",
    type: "Workshop",
    registrationStatus: "Pending",
    paymentStatus: "Unpaid",
    location: "Sports Center Hall A",
  },
  {
    id: "4",
    name: "Night Trail Run",
    date: "2025-05-10",
    time: "07:00 PM",
    type: "10km",
    registrationStatus: "Confirmed",
    paymentStatus: "Paid",
    location: "Mountain Trail",
    ticketId: "TKT-003-2025",
  },
  {
    id: "5",
    name: "Charity Walk",
    date: "2024-12-01",
    time: "09:00 AM",
    type: "5km",
    registrationStatus: "Confirmed",
    paymentStatus: "Paid",
    location: "Downtown Square",
    ticketId: "TKT-004-2024",
  },
];

export const mockStats = {
  totalEventsRegistered: 5,
  upcomingEvents: 3,
  completedEvents: 2,
  totalPayments: 245.0,
};

export const mockUserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  emergencyContact: "+1 (555) 987-6543",
};

// Derived data
export const confirmedTickets = mockEvents.filter(
  (e) => e.registrationStatus === "Confirmed" && e.ticketId
);
