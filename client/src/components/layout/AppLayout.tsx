import { useState } from "react";
import { Outlet } from "react-router";

import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f8fa] transition-colors dark:bg-zinc-950">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="min-h-screen md:ml-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1440px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
