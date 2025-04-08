"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Coins, Lock, Users, Rocket, Shield } from "lucide-react";

// Fallback component for SSR
const Fallback = ({ children, className }) => (
  <div className={className}>{children}</div>
);

// Dynamically import framer-motion components
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false, loading: () => <Fallback /> }
);

const TokenomicsPage = () => {
  const tokenDistribution = [
    { category: "Rewards Pool", percentage: 40, icon: Coins },
    { category: "Team & Advisors", percentage: 20, icon: Users },
    { category: "Development", percentage: 15, icon: Rocket },
    { category: "Reserve", percentage: 15, icon: Lock },
    { category: "Security", percentage: 10, icon: Shield },
  ];

  return (
    <div className="bg-gradient-to-bl from-black via-[#130fa3] to-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-28">
        {/* Token Overview */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">Rcoin (REC) Tokenomics</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {["Token Symbol", "Initial Value", "Total Supply"].map(
              (item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 text-center"
                >
                  <h3 className="text-xl font-semibold mb-2">{item}</h3>
                  <p className="text-3xl text-blue-400">
                    {item === "Token Symbol"
                      ? "REC"
                      : item === "Initial Value"
                      ? "€0.50"
                      : "1,000,000,000"}
                  </p>
                </div>
              )
            )}
          </div>
        </MotionDiv>

        {/* Token Distribution */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Token Distribution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {tokenDistribution.map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 text-center"
              >
                <item.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.category}</h3>
                <p className="text-3xl text-blue-400">{item.percentage}%</p>
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* Smart Contract */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Smart Contract</h2>
          <p className="text-gray-300 mb-4">
            The Rcoin smart contract is deployed on the Ethereum blockchain.
            View the verified contract on Etherscan:
          </p>
          <code className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg text-blue-400">
            0x1234...5678
          </code>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsPage;
