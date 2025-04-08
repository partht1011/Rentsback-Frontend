"use client";

import React from "react";
import dynamic from "next/dynamic";

// Fallback component while loading framer-motion
const FallbackTR = ({ children }) => <tr>{children}</tr>;

// Dynamically import framer-motion components
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false, loading: () => <div /> }
);

const MotionTR = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.tr),
  { ssr: false, loading: () => <FallbackTR /> }
);

const TransactionsTable = ({ transactions }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-x-auto"
    >
      <table className="w-full hidden md:table">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              S.No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Token
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((tx, index) => (
            <MotionTR
              key={tx.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tx.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tx.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tx.token}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    tx.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : tx.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {tx.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{tx.date}</td>
            </MotionTR>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden">
        {transactions.map((tx, index) => (
          <MotionDiv
            key={tx.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow-md rounded-lg p-4 mb-4"
          >
            <p className="text-sm font-semibold">S.No: {index + 1}</p>
            <p className="text-sm">Type: {tx.type}</p>
            <p className="text-sm">Amount: {tx.amount}</p>
            <p className="text-sm">Token: {tx.token}</p>
            <p className="text-sm">Date: {tx.date}</p>
            <p className="text-sm">
              Status:{" "}
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  tx.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : tx.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {tx.status}
              </span>
            </p>
          </MotionDiv>
        ))}
      </div>
    </MotionDiv>
  );
};

export default TransactionsTable;
