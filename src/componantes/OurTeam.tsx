
import type React from "react";
import member1 from "../assets/team1.jpg.png"; 
import member2 from "../assets/team2.jpg (1).png"; 
import member3 from "../assets/team2.jpg.png"; 
import { Link } from "react-router-dom";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Courtney Henry",
    role: "Development Manager",
    image: member1,
  },
  {
    id: 2,
    name: "Jerome Bell",
    role: "Software Tester",
    image: member2,
  },
  {
    id: 3,
    name: "Jerome Bell",
    role: "Software Tester",
    image: member3,
  },
];
 const OurTeam :React.FC= () => {
  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Heading */}
        <h2 className="font-heading text-3xl sm:text-[38px] font-bold tracking-tight text-[#0f172a] mb-12 text-left">
          Our Team
        </h2>

        {/* 3-Column Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image Container with Rounded Corners & Hover Zoom */}
              <div className="relative w-full h-[360px] sm:h-[390px] lg:h-[400px] rounded-[28px] overflow-hidden bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Name & Role Text */}
              <div className="mt-4 flex flex-col text-left">
                <h3 className="font-heading text-lg sm:text-[19px] font-bold text-[#0f172a] tracking-tight group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                <p className="font-line text-xs sm:text-[13px] text-gray-500 mt-1 font-normal">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom "View All" Button */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link
            to="/aboutus"
            className="group inline-flex items-center gap-3 border border-gray-300 rounded-full pl-6 pr-2 py-1.5 text-xs font-semibold text-gray-900 transition-all duration-300 hover:border-black hover:shadow-md cursor-pointer"
          >
            <span>View All</span>
            <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs transition-transform duration-300 group-hover:rotate-45">
              ↗
            </span>
          </Link>
        </div>

      </div>
    </section>
  )
}
export default OurTeam