// 1. Top row images
import logo from "../assets/Car-logo.png";
import iconAddress from "../assets/Icon+bg.png";
import iconEmail from "../assets/Icon+bg (1).png";
import iconPhone from "../assets/Icon+bg (2).png";

// 2. Social Media icons
import iconGoogle from "../assets/Google Plus.png";
import iconFacebook from "../assets/Facebook Circled.png";
import iconLinkedin from "../assets//LinkedIn Circled.png";
import iconYoutube from "../assets/Group.png";

// 3. App Store buttons
import appStoreBadge from "../assets/Group (1).png";
import googlePlayBadge from "../assets/Google Play.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="w-full bg-[#081b18] text-white pt-16 pb-8 px-6 sm:px-10 lg:px-16 select-none border-t border-white/5">
      <div className="max-w-[1360px] mx-auto">
        {/* ================= 1. TOP CONTACT INFO BAR ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-14 border-b border-white/10 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group cursor-pointer mr-6 sm:mr-10 transition-transform"
          >
            <img
              src={logo}
              alt="CarHut Logo"
              className="h-11 sm:h-14 w-auto max-w-[160px] sm:max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Address */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              <img
                src={iconAddress}
                alt="Address"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-line text-xs text-gray-400">Address</span>
              <span className="font-line text-xs font-semibold text-white tracking-wide">
                Oxford Ave. Cary, NC 27511
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              <img
                src={iconEmail}
                alt="Email"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-line text-xs text-gray-400">Email</span>
              <a
                href="mailto:nwigen@yahoo.com"
                className="font-line text-xs font-semibold text-white hover:text-emerald-400 transition-colors tracking-wide"
              >
                nwigen@yahoo.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              <img
                src={iconPhone}
                alt="Phone"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-line text-xs text-gray-400">Phone</span>
              <a
                href="tel:+5375476401"
                className="font-line text-xs font-semibold text-white hover:text-emerald-400 transition-colors tracking-wide"
              >
                +537 547-6401
              </a>
            </div>
          </div>
        </div>

        {/* ================= 2. MAIN FOOTER CONTENT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-16 items-start">
          {/* Col 1: About Paragraph & Socials (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col text-left">
            <p className="font-line text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              Lorem ipsum dolor sit amet consectetur. Nec magna non egestas in.
              Enim habitant habitant id nec maecenas.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://google.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-transform hover:scale-110"
              >
                <img
                  src={iconGoogle}
                  alt="Google Plus"
                  className="w-6 h-6 object-contain"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-transform hover:scale-110"
              >
                <img
                  src={iconFacebook}
                  alt="Facebook"
                  className="w-6 h-6 object-contain"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-transform hover:scale-110"
              >
                <img
                  src={iconLinkedin}
                  alt="LinkedIn"
                  className="w-6 h-6 object-contain"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-transform hover:scale-110"
              >
                <img
                  src={iconYoutube}
                  alt="YouTube"
                  className="w-6 h-6 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Col 2: Vehicles Links 1 (2.5 Cols) */}
          <div className="lg:col-span-2 flex flex-col text-left">
            <h4 className="font-heading text-sm font-bold text-white mb-5 tracking-wide">
              Vehicles
            </h4>
            <ul className="space-y-3 font-line text-xs text-gray-400">
              <li>
                <Link
                  to="/aboutus"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-white transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  F.A.Q
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Vehicles Links 2 (2.5 Cols) */}
          <div className="lg:col-span-2 flex flex-col text-left">
            <h4 className="font-heading text-sm font-bold text-white mb-5 tracking-wide">
              Vehicles
            </h4>
            <ul className="space-y-3 font-line text-xs text-gray-400">
              <li>
                <Link
                  to="/aboutus"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-white transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  F.A.Q
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Download App Container (4 Cols) */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="border border-white/20 rounded-2xl p-6 bg-white/[0.02] flex flex-col items-start w-full sm:w-[260px]">
              <h4 className="font-heading text-sm font-bold text-white mb-4 tracking-wide">
                Download App
              </h4>
              <div className="flex flex-col gap-3 w-full">
                <a
                  href="https://apple.com/app-store"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full transition-transform hover:scale-105 active:scale-95"
                >
                  <img
                    src={appStoreBadge}
                    alt="Download on the App Store"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </a>
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full transition-transform hover:scale-105 active:scale-95"
                >
                  <img
                    src={googlePlayBadge}
                    alt="Get it on Google Play"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. BOTTOM COPYRIGHT & SCROLL TOP ================= */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-line text-xs text-gray-400">
          {/* Left Copyright */}
          <p>© 2026 exemple.com. All rights reserved.</p>

          {/* Middle Links */}
          <div className="flex items-center gap-3 text-gray-400">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>*</span>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Notice
            </Link>
          </div>

          {/* Right Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#059669] hover:bg-[#047857] text-white flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 active:scale-95 shadow-md cursor-pointer"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
