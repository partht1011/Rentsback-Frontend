import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/AdminSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Dashboard Navbar */}
        <div className="h-16 bg-white text-black shadow-md flex items-center overflow-hidden">
          <DashboardNavbar />
        </div>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
