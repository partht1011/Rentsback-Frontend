"use client";

import React, {useEffect, useState} from "react";
import {
  Users,
  UserPlus,
  RefreshCcw,
  ShoppingCart,
  Bookmark,
  Bell,
} from "lucide-react";
import {useFetchDashboardStats} from "@/hooks/dashboard/useFetchDashboardStats";

const AdminDashboard = () => {
  const { data: dashboardData, isLoading, error } = useFetchDashboardStats();
  const [dashboardStats, setDashboardStats] = useState([]);

  useEffect(() => {
    setDashboardStats([
      {
        title: "No. of Users",
        value: dashboardData && dashboardData['No. of Users'] || 0,
        icon: <Users className="w-6 h-6 text-white" />,
      },
      {
        title: "No. of Initial requests",
        value: dashboardData && dashboardData['No. of Initial requests'] || 0,
        icon: <UserPlus className="w-6 h-6 text-white" />,
      },
      {
        title: "No. of renewals",
        value: dashboardData && dashboardData['No. of renewals'] || 0,
        icon: <RefreshCcw className="w-6 h-6 text-white" />,
      },
      {
        title: "No. of terminations",
        value: dashboardData && dashboardData['No. of terminations'] || 0,
        icon: <ShoppingCart className="w-6 h-6 text-white" />,
      },
      {
        title: "No. of NFT minted",
        value: dashboardData && dashboardData['No. of NFT minted'] || 0,
        icon: <Bookmark className="w-6 h-6 text-white" />,
      },
      {
        title: "Current Token Price",
        value: dashboardData && dashboardData['Current Token Price'] || 0,
        icon: <Bell className="w-6 h-6 text-white" />,
      },
    ])
  }, [dashboardData])

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">ADMIN DASHBOARD</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {!isLoading && dashboardStats?.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-gray-600 text-sm font-semibold">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className="bg-[#130fa3] p-3 rounded-full">{stat.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
