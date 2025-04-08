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

const history = [
  {
    id: "1",
    referenceId: "0xabc123...",
    formType: "Transfer",
    status: "Completed",
    createdDate: "2025-03-09",
    action: "View",
  },
  {
    id: "2",
    referenceId: "0xdef456...",
    formType: "Smart Contract Execution",
    status: "Pending",
    createdDate: "2025-03-08",
    action: "View",
  },
  {
    id: "3",
    referenceId: "0xghi789...",
    formType: "NFT Mint",
    status: "Completed",
    createdDate: "2025-03-07",
    action: "View",
  },
  {
    id: "4",
    referenceId: "0xjkl012...",
    formType: "Liquidity Pool Deposit",
    status: "Failed",
    createdDate: "2025-03-06",
    action: "View",
  },
  {
    id: "5",
    referenceId: "0xmnop345...",
    formType: "Token Swap",
    status: "Completed",
    createdDate: "2025-03-05",
    action: "View",
  },
];

const HistorySection = () => {
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
        <h2 className="text-lg md:text-2xl font-bold mb-4">History</h2>

        {/* Desktop View - Regular Table */}
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
                  Status
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Created Date
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.map((item, index) => (
                <MotionTr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.referenceId}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.formType}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.createdDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button className="text-[#130fa3] hover:underline">
                      {item.action}
                    </button>
                  </td>
                </MotionTr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Card-based Layout */}
        <div className="md:hidden space-y-4">
          {history.map((item, index) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <div
                className="flex justify-between items-center p-3 cursor-pointer bg-gray-50"
                onClick={() => toggleExpandRow(item.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{index + 1}.</span>
                  <div>
                    <div className="font-medium">{item.formType}</div>
                    <div className="text-xs text-gray-500">
                      {item.referenceId}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      expandedRow === item.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>

              {expandedRow === item.id && (
                <div className="p-3 bg-white border-t">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Created Date:</div>
                    <div>{item.createdDate}</div>

                    <div className="text-gray-500">Reference ID:</div>
                    <div className="truncate">{item.referenceId}</div>

                    <div className="text-gray-500">Action:</div>
                    <div>
                      <button className="text-[#130fa3] hover:underline">
                        {item.action}
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

export default HistorySection;
