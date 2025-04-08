"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CheckCircle, Clock } from "lucide-react";

// Use regular div as fallback while waiting for Framer Motion to load
const Fallback = ({ children, className }) => (
  <div className={className}>{children}</div>
);

// Dynamically import Framer Motion components
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false, loading: () => <Fallback /> }
);

const milestones = [
  {
    title: "Platform Launch",
    description: "Initial release of Rentsback platform with core features",
    date: "Q1 2024",
    completed: true,
  },
  {
    title: "20,000 Smart Contracts",
    description: "Achieve milestone of 500,000 active rental smart contracts",
    date: "Q1 2025",
    completed: false,
  },
  {
    title: "Rcoin Listing",
    description: "REC token listed on major cryptocurrency exchanges",
    date: "Q2 2025",
    completed: false,
  },
  {
    title: "End of Special Discount",
    description: "Conclusion of initial promotional period",
    date: "Q3 2025",
    completed: false,
  },
  {
    title: "Mobile App Launch",
    description: "Release of Rentsback mobile application",
    date: "Q3 2025",
    completed: false,
  },
  {
    title: "Rentsback Real Estate",
    description:
      "Integration with real estate services and property management",
    date: "Q3 2025",
    completed: false,
  },
  {
    title: "Progressive Property Offerings",
    description: "Launch of advanced property investment features",
    date: "Q4 2025",
    completed: false,
  },
  {
    title: "Future Expansion",
    description: "Expansion into new markets and enhanced platform features",
    date: "Q1 2026",
    completed: false,
  },
];

const Roadmap = () => {
  return (
    <div className="w-full bg-gradient-to-bl from-black via-[#130fa3] to-black py-28">
      <div className="relative max-w-6xl mx-auto px-4 text-white">
        <h1 className="text-4xl font-bold text-center mb-12">Roadmap</h1>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white opacity-30"></div>

          {milestones.map((milestone, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-center gap-6 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div
                className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white shadow-lg bg-opacity-90"
                style={{
                  backgroundColor: milestone.completed ? "#10B981" : "#3B82F6",
                }}
              >
                {milestone.completed ? (
                  <CheckCircle className="h-6 w-6 text-white" />
                ) : (
                  <Clock className="h-6 w-6 text-white" />
                )}
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 w-full md:w-1/2">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-300 mb-2">{milestone.description}</p>
                <p className="text-sm text-gray-400">{milestone.date}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
