import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/Admin/AdminSidebar";
import AdminNavbar from "../pages/Admin/AdminNavbar";


export const Adminwrapper = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#f4f6fb] font-sans antialiased text-[#111827]">
      {/* 1. Left White Aside Sidebar */}
      <AdminSidebar />

      {/* 2. Main Content View Area */}
      <main className="flex-1 min-w-0 bg-[#f4f6fb] px-[26px] py-5 flex flex-col overflow-y-auto">
        <AdminNavbar title="Car Categories" />
        
        {/* Active Page (Table, Forms, Modals) */}
        <div className="flex-1 w-full bg-transparent">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Adminwrapper;