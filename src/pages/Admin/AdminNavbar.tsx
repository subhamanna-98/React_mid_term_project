import SearchIcon from "@mui/icons-material/Search";
import Cookies from "js-cookie";

interface AdminNavbarProps {
  title?: string;
}

export const AdminNavbar = ({ title = "Car Categories" }: AdminNavbarProps) => {
  // Read Logged-in Admin user details from Cookie
  const rawUser = Cookies.get("user");
  let displayName = "Admin";

  if (rawUser) {
    try {
      const parsed = JSON.parse(rawUser);
      displayName =
        parsed.name ||
        parsed.fullName ||
        parsed.username ||
        (parsed.email ? parsed.email.split("@")[0] : "Admin");
    } catch {
      displayName = "Admin";
    }
  }

  // First letter capitalized dynamically
  const initialLetter = displayName.trim().charAt(0).toUpperCase() || "A";

  return (
    <div className="flex items-center justify-between gap-3 mb-[22px] flex-wrap">
      {/* Page Title */}
      <h1 className="text-[22px] font-bold text-[#111827] m-0">
        {title}
      </h1>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search Bar matching template */}
        <div className="flex items-center px-3 py-2 bg-white border border-[#e5e7eb] rounded-lg min-w-[220px] shadow-sm">
          <SearchIcon className="text-[#9ca3af] !text-[18px] mr-2" />
          <input
            type="text"
            placeholder="Search bookings, cars, customers…"
            className="w-full text-[13px] text-[#111827] placeholder-[#9ca3af] bg-transparent outline-none"
          />
        </div>

        {/* Dynamic Admin Avatar (Class .av from Template) */}
        <div
          title={displayName}
          className="w-[36px] h-[36px] rounded-full bg-[#dbeafe] text-[#2563eb] border border-[#bfdbfe] flex items-center justify-center font-bold text-[14px] cursor-pointer select-none"
        >
          {initialLetter}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;