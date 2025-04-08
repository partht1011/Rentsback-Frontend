"use client";

import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {useAuth} from "@/context/AuthContext";

const DashboardNavbar = () => {
  const { user } = useAuth();

  return (
    <div className="h-16 w-full text-black shadow-md flex items-center justify-end px-6">
      {/* Profile Section */}
      <div className="flex items-center gap-3">
        {/* Profile Image or Default Icon */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#130fa3] flex items-center justify-center shadow-md">
          {user?.profileImage?.url ? (
            <Image
              src={user.profileImage.url}
              alt="Profile Image"
              width={40}
              height={40}
              className="object-cover rounded-full"
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
        </div>

        {/* User Name & Email */}

        <Popover>
          <PopoverTrigger>
            <div>
              <p className="text-sm font-medium">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Link
              href="/dashboard/"
              className="block p-2 mb-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Profile
            </Link>
          </PopoverContent>
        </Popover>
      </div>

      {/* Connect Wallet Button */}
      <div className="ml-4">
        <ConnectButton />
      </div>
    </div>
  );
};

export default DashboardNavbar;
