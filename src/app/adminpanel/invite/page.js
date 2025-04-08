"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";
import axios from "axios";

const Fallback = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {
    ssr: false,
    loading: () => (
      <Fallback className="bg-white rounded-lg shadow-lg overflow-hidden" />
    ),
  }
);

const MotionTr = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.tr),
  { ssr: false, loading: () => <tr className="hover:bg-gray-50" /> }
);

const InvitePage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState([]);

  const sendInvite = async () => {
    if (!email) return toast.error("Please enter an email");
    try {
      const response = await axios.post("/api/invite", { email });
      setInvites([...invites, { email, deadline: "Pending..." }]);
      console.log(response);
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden mt-4 w-full"
    >
      <div className="p-4 md:p-6 w-full">
        <h2 className="text-lg md:text-2xl font-bold mb-4">Invite Users</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={sendInvite}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Send Invite
          </button>
        </div>

        {/* <div className="overflow-x-auto w-full">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  No
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invites.map((invite, index) => (
                <MotionTr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {invite.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap flex items-center justify-between">
                    {invite.deadline}
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </td>
                </MotionTr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </MotionDiv>
  );
};

export default InvitePage;
