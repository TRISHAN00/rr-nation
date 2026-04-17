export const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Users", icon: User, path: "/dashboard/users" },

    {
        title: "Members",
        icon: User,
        path: "/dashboard/members",
        children: [
            {
                title: "Coupons",
                path: "/dashboard/members/coupons",
            },
        ],
    },

    { title: "Events", icon: Calendar, path: "/dashboard/events" },
    { title: "Registrations", icon: UserCheck, path: "/dashboard/registrations" },
    { title: "Services", icon: Briefcase, path: "/dashboard/services" },
    { title: "Blog Posts", icon: FileText, path: "/dashboard/blog" },
    { title: "Team", icon: Users, path: "/dashboard/team" },
    { title: "Gallery", icon: Image, path: "/dashboard/gallery" },
    { title: "Testimonial", icon: MessageSquare, path: "/dashboard/testimonial" },
    { title: "Payments", icon: CreditCard, path: "/dashboard/payments" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
];