import blog1 from "../assets/img (5).png"; // Steering wheel image
import blog2 from "../assets/img (6).png"; // Wheel/rim focus image
import blog3 from "../assets/img@2x.png"; // Grey sports car image

// 2. Exterior Badge Image import:
import exteriorBadgeImg from "../assets/Group 18.png";
import { Link } from "react-router-dom";
import type React from "react";
interface BlogPost {
  id: number;
  author: string;
  date: string;
  title: string;
  image: string;
}
const blogPosts: BlogPost[] = [
  {
    id: 1,
    author: "Admin",
    date: "November 22, 2023",
    title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
    image: blog1,
  },
  {
    id: 2,
    author: "Admin",
    date: "November 22, 2023",
    title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
    image: blog2,
  },
  {
    id: 3,
    author: "Admin",
    date: "November 22, 2023",
    title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
    image: blog3,
  },
];
 const LatestBlogPosts:React.FC = () => {
  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Heading */}
        <h2 className="font-heading text-3xl sm:text-[38px] font-bold tracking-tight text-[#0f172a] mb-12 text-left">
          Latest Blog Posts
        </h2>

        {/* 3-Column Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="group flex flex-col bg-white border border-gray-100 rounded-[24px] p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full h-[260px] sm:h-[280px] rounded-[18px] overflow-hidden bg-gray-100">
                {/* Background Car Image + Hover Zoom */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Exterior Badge Image: Initially Hide -> Hover korle bheshe uthbe */}
                <div className="absolute top-4 left-4 z-10 transition-all duration-300 ease-out opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                  <img
                    src={exteriorBadgeImg}
                    alt="Exterior Badge"
                    className="h-7 sm:h-8 w-auto object-contain drop-shadow-md select-none"
                  />
                </div>
              </div>

              {/* Blog Details Info */}
              <div className="pt-5 pb-2 flex flex-col text-left">
                {/* Author & Date */}
                <div className="font-line text-xs text-gray-400 mb-2 flex items-center gap-2">
                  <span>{post.author}</span>
                  <span className="text-gray-300">•</span>
                  <span>{post.date}</span>
                </div>

                {/* Blog Title */}
                <h3 className="font-heading text-base sm:text-[17px] font-bold text-[#0f172a] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link
            to="/blog"
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
export default LatestBlogPosts