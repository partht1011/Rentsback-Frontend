"use client";

import React, {useState} from "react";
import dynamic from "next/dynamic";
import { User, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";
import { useFetchUserData } from "@/hooks/auth/useAuthActions";

const MotionDiv = dynamic(
    () => import("framer-motion").then((mod) => mod.motion.div),
    {
      ssr: false,
      loading: () => (
          <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse" />
      ),
    }
);

const ProfileSection = () => {
  const [rcoinBalance, setRcoinBalance] = useState(0);

  // Use the TanStack Query hook
  const { data: user, isLoading, error } = useFetchUserData();

  // Safely parse cookies
  const userCookie = Cookies.get("user");
  const storedUser = userCookie && userCookie !== "undefined"
      ? JSON.parse(userCookie)
      : null;

  const displayUser = user || storedUser;

  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Error loading user data</p>;
  if (!displayUser) return <p>No user data available</p>;

  return (
      <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg text-black shadow-lg p-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-[#130fa3]">
            {displayUser?.profileImage?.url ? (
                <Image
                    src={displayUser.profileImage.url}
                    alt="User Profile"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                />
            ) : (
                <User className="w-10 h-10 text-white" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {displayUser?.name || "User"}
            </h2>
            <p className="text-gray-600 text-sm">{displayUser?.email}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Rcoin Balance</h3>
          <p className="text-gray-700">Your balance: {rcoinBalance} Rcoin</p>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/dashboard/editprofile" className="w-full">
            <Button variant="outline" className="flex items-center gap-2 w-full">
              <Edit className="w-5 h-5" /> Edit Profile
            </Button>
          </Link>
        </div>
      </MotionDiv>
  );
};

export default ProfileSection;