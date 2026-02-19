import Title from "@/app/components/common/Title";
import TeamFilter from "./TeamFilter";

const admin = [
  {
    id: 1,
    name: "Hamidur Rahman",
    role: "Admin",
    image: "/dynamic/team/admin/RRN 100 Hamidur Rahman.JPG",
  },
  {
    id: 2,
    name: "A R Khan Bappy",
    role: "Admin",
    image: "/dynamic/team/admin/RRN 101 A R Khan Bappy.JPG",
  },
  {
    id: 3,
    name: "Moontasir Zaman Piyas",
    role: "Admin",
    image: "/dynamic/team/admin/RRN 102 Moontasir Zaman Piyas.JPG",
  },
  {
    id: 4,
    name: "Md. Tanzil Hasan Rafi",
    role: "Admin",
    image: "/dynamic/team/admin/RRN 103 Md. Tanzil Hasan Rafi.png",
  },
  {
    id: 5,
    name: "Khalid Mahmud",
    role: "Admin",
    image: "/dynamic/team/admin/RRN 104 Khalid Mahmud.png",
  },
];

const advisor = [
  {
    id: 1,
    name: "Md. Atiqur Rahman",
    role: "Advisor",
    image: "/dynamic/team/advisor/Md. Atiqur Rahman.jpeg",
  },
  {
    id: 2,
    name: "Md. Hedayet Ali",
    role: "Advisor",
    image: "/dynamic/team/advisor/Md. Hedayet Ali.jpeg",
  },
  {
    id: 3,
    name: "Nipu Sen",
    role: "Advisor",
    image: "/dynamic/team/advisor/NIPU SEN.jpeg",
  },
  {
    id: 4,
    name: "Rezaur Rahman",
    role: "Advisor",
    image: "/dynamic/team/advisor/REZAUR RAHMAN.JPG",
  },
  {
    id: 5,
    name: "Shahriar Morshed Siddiqi",
    role: "Advisor",
    image: "/dynamic/team/advisor/Shahriar Morshed Siddiqi.jpg",
  },
];

const coreTeam = [
  {
    id: 7,
    name: "Dipta Brahma",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 137 Dipta Brahma.JPG",
  },
  {
    id: 8,
    name: "Md Saidul Islam Anik",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 142 Md Saidul Islam Anik.JPG",
  },
  {
    id: 9,
    name: "Mahede Hasan",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 147 Mahede Hasan.JPG",
  },
  {
    id: 10,
    name: "MD. Al-Amin Miah",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 154 MD. Al-Amin Miah.JPG",
  },
  {
    id: 11,
    name: "ARIF RAHMAN KHAN",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 166 ARIF RAHMAN KHAN.JPG",
  },
  {
    id: 12,
    name: "Abdullah Bin Jafor",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 167 Abdullah Bin Jafor.JPG",
  },
  {
    id: 13,
    name: "Afnan Osman Polin",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 189 Afnan Osman Polin.JPG",
  },
  {
    id: 14,
    name: "Alif Ahmed Sezan",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 196 Alif Ahmed Sezan.JPG",
  },
  {
    id: 15,
    name: "Mir Sadikul Omar",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 198 Mir Sadikul Omar.JPG",
  },
  {
    id: 16,
    name: "Mohammad Ibrahim",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 226 Mohammad Ibrahim.JPG",
  },
  {
    id: 17,
    name: "Md Imon Islam",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 228 Md Imon Islam.JPG",
  },
  {
    id: 18,
    name: "Md. Raisul Islam",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 229 Md. Raisul Islam.JPG",
  },
  {
    id: 19,
    name: "Sobuj Hossain Shanto",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 230 Sobuj Hossain Shanto.JPG",
  },
  {
    id: 20,
    name: "Shaon Sikder Sunny",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 231 Shaon Sikder Sunny.JPG",
  },
  {
    id: 21,
    name: "Md. Akram Hoshen",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 232 Md. Akram Hoshen.JPG",
  },
  {
    id: 22,
    name: "Samir Hossain",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 252 Samir Hossain.JPG",
  },
  {
    id: 23,
    name: "Syed Abdullah Maaz",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 272 Syed Abdullah Maaz.JPG",
  },
  {
    id: 24,
    name: "Md. Maksud Hasan Jonaidy",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 288 Md. Maksud Hasan Jonaidy.JPG",
  },
  {
    id: 25,
    name: "Md Golam Mortuja",
    role: "Core Team",
    image: "/dynamic/team/core-team/RRN 289 Md Golam Mortuja.JPG",
  }
];

const allMembers = { admin, advisor, coreTeam };

export default function Team() {
  return (
    <section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5 py-14 sm:py-20 lg:py-30">
        <Title
          label="TEAM"
          title="Meet Our Team"
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
