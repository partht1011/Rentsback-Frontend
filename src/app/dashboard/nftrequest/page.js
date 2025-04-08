"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";

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

const requests = [
  {
    id: "1",
    referenceId: "REF123456",
    formType: "Minting Request",
    action: "View Details",
  },
  {
    id: "2",
    referenceId: "REF654321",
    formType: "Transfer Request",
    action: "Approve",
  },
  {
    id: "3",
    referenceId: "REF987654",
    formType: "Burn Request",
    action: "Reject",
  },
  {
    id: "4",
    referenceId: "REF456789",
    formType: "Update Metadata",
    action: "View Details",
  },
];

const NFTRequestsSection = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden mt-4 w-full"
    >
      <div className="p-4 md:p-6 w-full">
        <h2 className="text-lg md:text-2xl font-bold mb-4">NFT Requests</h2>

        {/* Desktop View - Table */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  S.No
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Reference ID
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Form Type
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request, index) => (
                <MotionTr
                  key={request.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {request.referenceId}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {request.formType}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button className="text-[#130fa3] hover:underline">
                      {request.action}
                    </button>
                  </td>
                </MotionTr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Card-based Layout */}
        <div className="md:hidden space-y-4">
          {requests.map((request, index) => (
            <div
              key={request.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <div
                className="flex justify-between items-center p-3 cursor-pointer bg-gray-50"
                onClick={() => toggleExpandRow(request.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{index + 1}.</span>
                  <div>
                    <div className="font-medium">{request.formType}</div>
                    <div className="text-xs text-gray-500">
                      {request.referenceId}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    expandedRow === request.id ? "rotate-90" : ""
                  }`}
                />
              </div>

              {expandedRow === request.id && (
                <div className="p-3 bg-white border-t">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Reference ID:</div>
                    <div className="truncate">{request.referenceId}</div>

                    <div className="text-gray-500">Form Type:</div>
                    <div>{request.formType}</div>

                    <div className="text-gray-500">Action:</div>
                    <div>
                      <button className="text-[#130fa3] hover:underline">
                        {request.action}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MotionDiv>
  );
};

export default NFTRequestsSection;
