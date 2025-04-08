"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Shield, Coins, Building, Users } from "lucide-react";
import dynamic from "next/dynamic";

// Use regular components as fallbacks while waiting for framer-motion to load
const Fallback = ({ children, className }) => (
  <div className={className}>{children}</div>
);

// Dynamically import framer-motion components
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

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-r from-black to-black text-white flex items-center justify-center ">
        {/* Neon Blob */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[300px] h-[300px] md:h-[500px] md:w-[500px] bg-[#130fa3] opacity-40 blur-3xl rounded-full absolute"></div>
        </div>
        <div className="relative max-w-4xl text-center">
          <MotionH1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold"
          >
            <span className="text-[#130fa3]">Blockchain</span> in Real Estate
          </MotionH1>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4 text-lg md:text-xl"
          >
            As an owner, your payments contribute to an investment—your
            property. As a tenant, all the money paid for rent is spent without
            return. Around the world, hundreds of millions of people rent their
            homes and spend trillions of dollars. Rentsback will offer the
            opportunity to earn rewards by tokenizing rental leases information.
          </MotionP>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex justify-center space-x-4"
          >
            <button className="bg-[#130fa3] hover:bg-[#130fa3] px-6 py-3 rounded-lg text-lg font-semibold">
              Invest
            </button>

            <Link
              href="https://rentsback.com/assets/rentsback.pdf"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Whitepaper
            </Link>
          </MotionDiv>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black via-[#130fa3] to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-white font-bold mb-4">
              Why Choose Rentsback?
            </h2>
            <p className="text-xl text-gray-300">
              Experience the future of rental payments and rewards
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Payments",
                text: "Smart contract-powered transactions for maximum security",
              },
              {
                icon: Coins,
                title: "Earn Rewards",
                text: "Get Rcoin rewards for every rent payment",
              },
              {
                icon: Building,
                title: "Property Access",
                text: "Exclusive access to premium property listings",
              },
              {
                icon: Users,
                title: "Community",
                text: "Join a growing community of smart renters",
              },
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
                className="rounded-lg p-6 text-center bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl"
              >
                <div className="mx-auto mb-4">
                  {React.createElement(item.icon, {
                    className: "h-12 w-12 text-blue-400 mx-auto",
                  })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.text}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-black via-[#130fa3] to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">250K+</div>
              <div className="text-gray-300">Active Users</div>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">€10M+</div>
              <div className="text-gray-300">Total Rewards Distributed</div>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">100K+</div>
              <div className="text-gray-300">Smart Contracts Created</div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black via-[#130fa3] to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 bg-opacity-20 backdrop-blur-xl border border-white/30 shadow-[0_4px_30px_rgba(255,255,255,0.1)] rounded-2xl text-white text-center py-16 px-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-xl mb-8">
              Join thousands of smart renters already earning rewards
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
