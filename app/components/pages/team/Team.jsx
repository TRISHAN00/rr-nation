import Title from "@/app/components/common/Title";
import TeamFilter from "./TeamFilter";

const admin = [
  { id: 1, name: "Hamidur Rahman", role: "Admin", image: "/dynamic/team/admin/RRN 100 Hamidur Rahman.JPG" },
  { id: 2, name: "A R Khan Bappy", role: "Admin", image: "/dynamic/team/admin/RRN 101 A R Khan Bappy.JPG" },
  { id: 3, name: "Moontasir Zaman Piyas", role: "Admin", image: "/dynamic/team/admin/RRN 102 Moontasir Zaman Piyas.JPG" },
  { id: 4, name: "Md. Tanzil Hasan Rafi", role: "Admin", image: "/dynamic/team/admin/RRN 103 Md. Tanzil Hasan Rafi.png" },
  { id: 5, name: "Khalid Mahmud", role: "Admin", image: "/dynamic/team/admin/RRN 104 Khalid Mahmud.png" },
];

const advisor = [
  { id: 1, name: "Md. Atiqur Rahman", role: "Advisor", image: "/dynamic/team/advisor/Md. Atiqur Rahman.jpeg" },
  { id: 2, name: "Md. Hedayet Ali", role: "Advisor", image: "/dynamic/team/advisor/Md. Hedayet Ali.jpeg" },
  { id: 3, name: "Nipu Sen", role: "Advisor", image: "/dynamic/team/advisor/NIPU SEN.jpeg" },
  { id: 4, name: "Rezaur Rahman", role: "Advisor", image: "/dynamic/team/advisor/REZAUR RAHMAN.JPG" },
  { id: 5, name: "Shahriar Morshed Siddiqi", role: "Advisor", image: "/dynamic/team/advisor/Shahriar Morshed Siddiqi.jpg" },
];

const coreTeam = [
  { id: 1, name: "Md Abu Eusuf", role: "Core Team", image: "/dynamic/team/core-team/RRN 106 Md Abu Eusuf.png" },
  { id: 2, name: "Sajidur Rahman Ridwan", role: "Core Team", image: "/dynamic/team/core-team/RRN 108 Sajidur Rahman Ridwan.JPG" },
  { id: 3, name: "Sheikh Shahriar Nuhash", role: "Core Team", image: "/dynamic/team/core-team/RRN 110 Sheikh Shahriar Nuhash.JPG" },
  { id: 4, name: "Saifullah Al-Mahmud Hossainy", role: "Core Team", image: "/dynamic/team/core-team/RRN 126 Saifullah Al-Mahmud Hossainy.JPG" },
  { id: 5, name: "Shadman Ahmad Abeer", role: "Core Team", image: "/dynamic/team/core-team/RRN 117 Shadman Ahmad Abeer.png" },
  { id: 6, name: "Sayedur Rahman", role: "Core Team", image: "/dynamic/team/core-team/RRN 135 Sayedur Rahman.JPG" },
];

const allMembers = { admin, advisor, coreTeam };

export default function Team() {
  return (
    <section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5 py-14 sm:py-20 lg:py-30">
        <Title
          label="TEAM"
          title="Meet Our Dedicated Members"
          hideBtnArrow
          hideSearch
          searchPlaceholder="Search team..."
        />
        {/* Pass the data to the filter component */}
        <TeamFilter data={allMembers} />
      </div>
    </section>
  );
}