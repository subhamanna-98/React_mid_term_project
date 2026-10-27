import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon fontSize="small" /> },
  { label: "Categories", path: "/admin/category", icon: <CategoryIcon fontSize="small" /> },
  { label: "Cars", path: "/admin/cars", icon: <DirectionsCarIcon fontSize="small" /> },
  { label: "Bookings", path: "/admin/bookings", icon: <CalendarMonthIcon fontSize="small" /> },
  { label: "Customers", path: "/admin/customers", icon: <PeopleIcon fontSize="small" /> },
];

const secondaryNavItems: NavItem[] = [
  { label: "Reports", path: "/admin/reports", icon: <BarChartIcon fontSize="small" /> },
  { label: "Settings", path: "/admin/settings", icon: <SettingsIcon fontSize="small" /> },
];

export const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-[220px] h-screen sticky top-0 bg-white border-r border-[#e5e7eb] px-[14px] py-5 flex flex-col justify-between shrink-0 z-20">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-2 px-2 pb-5">
          <div className="w-[30px] h-[30px] rounded-lg bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm">
            🚗
          </div>
          <span className="font-bold text-[18px] text-[#111827] tracking-tight">
            CarHut
          </span>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-[2px]">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-[10px] px-3 py-[9px] rounded-lg text-[14px] font-medium transition-all ${
                  isActive
                    ? "bg-[#dbeafe] text-[#2563eb] font-semibold"
                    : "text-[#6b7280] hover:bg-[#dbeafe] hover:text-[#2563eb]"
                }`
              }
            >
              <span className="flex items-center">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}

          {/* More Header */}
          <small className="block px-3 pt-4 pb-[6px] text-[#6b7280] text-[11px] font-semibold uppercase tracking-wider">
            More
          </small>

          {/* Secondary Navigation */}
          {secondaryNavItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-[10px] px-3 py-[9px] rounded-lg text-[14px] font-medium transition-all ${
                  isActive
                    ? "bg-[#dbeafe] text-[#2563eb] font-semibold"
                    : "text-[#6b7280] hover:bg-[#dbeafe] hover:text-[#2563eb]"
                }`
              }
            >
              <span className="flex items-center">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="border-t border-[#e5e7eb] pt-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-[10px] px-3 py-[9px] rounded-lg text-[14px] font-semibold text-[#dc2626] hover:bg-[#fee2e2] transition-colors"
        >
          <LogoutIcon fontSize="small" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;