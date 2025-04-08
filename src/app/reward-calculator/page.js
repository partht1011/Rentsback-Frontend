"use client";
import React from "react";
import dynamic from "next/dynamic";
import DarkThemeCalculator from "@/components/DarkThemeCalculator";

const Fallback = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false, loading: () => <Fallback /> }
);

const MotionH1 = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.h1),
  { ssr: false, loading: () => <Fallback /> }
);
const MotionP = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.p),
  { ssr: false, loading: () => <Fallback /> }
);

const page = () => {
  return (
    <div>
      <div className="relative min-h-screen bg-gradient-to-r from-black to-black text-white flex items-center justify-center ">
        {/* Neon Blob */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[300px] h-[300px] md:h-[500px] md:w-[500px] bg-[#130fa3] opacity-40 blur-3xl rounded-full absolute"></div>
        </div>
        <div className="relative max-w-4xl text-center">
          {/*  <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4 text-lg md:text-xl"
          >
            Real estate in the blockchain era is undergoing a shift. Blockchain
            technology is revolutionizing property transactions.
          </MotionP> */}
          {/*  <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex justify-center space-x-4"
          >
            <button className="bg-[#130fa3] hover:bg-[#130fa3] px-6 py-3 rounded-lg text-lg font-semibold">
              Invest
            </button>
            <button className="border border-gray-400 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800">
              Whitepaper
            </button>
          </MotionDiv> */}
          <DarkThemeCalculator />
        </div>
      </div>
    </div>
  );
};

export default page;
