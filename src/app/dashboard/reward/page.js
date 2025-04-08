"use client";

import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import { Coins, Lock, Wallet } from "lucide-react";
import TransactionsTable from "@/components/TransactionsTable";
import RewardCalculator from "@/components/RewardCalculator";
// import ConversionTab from "@/components/Conversion";
import {useFetchTenantRewards} from "@/hooks/rewards/useFetchTenantRewards";
import {useFetchUserData} from "@/hooks/auth/useAuthActions";

// Fallback component while loading framer-motion
const Fallback = ({ children, className }) => (
  <div className={className}>{children}</div>
);

// Dynamically import framer-motion components
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false, loading: () => <Fallback /> }
);

const transactions = [
  {
    id: "tx1",
    type: "Claim",
    amount: "100",
    token: "Rcoin",
    status: "Completed",
    date: "2025-03-09",
  },
  {
    id: "tx2",
    type: "Stake",
    amount: "500",
    token: "Rcoin",
    status: "Pending",
    date: "2025-03-08",
  },
  {
    id: "tx3",
    type: "Withdraw",
    amount: "200",
    token: "Rcoin",
    status: "Failed",
    date: "2025-03-07",
  },
  {
    id: "tx4",
    type: "Reward",
    amount: "50",
    token: "Rcoin",
    status: "Completed",
    date: "2025-03-06",
  },
  {
    id: "tx5",
    type: "Claim",
    amount: "75",
    token: "Rcoin",
    status: "Completed",
    date: "2025-03-05",
  },
];

const RewardsSection = () => {
  const { data: user } = useFetchUserData();
  const { data: tokens, isLoading, error } = useFetchTenantRewards(user?.tenant_id ?? '');

  const [rewardsData, setRewardsData] = useState([]);

  useEffect(() => {
    if(!isLoading) {
      setRewardsData([
        { title: "Daily Tokens", icon: Coins, value: tokens?.dailyTokens },
        { title: "Locked Tokens", icon: Lock, value: tokens?.lockedTokens },
        { title: "Claimable Tokens", icon: Wallet, value: tokens?.claimableTokens },
      ])
    }
  }, [tokens, isLoading])

  return (
    <div className="space-y-6">
      {/* Small card displaying Rcoin in Euro */}
      {/*<div className="bg-white p-3 rounded-lg shadow-md w-[400px] text-center md:ml-[500px] ml-[5px]">
        <ConversionTab />
      </div>*/}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {!isLoading && rewardsData.length > 0 && rewardsData.map((card) => (
          <MotionDiv
            key={card.title}
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-3">
              <card.icon className="w-6 h-6 text-[#130fa3]" />
              <h3 className="text-lg font-semibold">{card.title}</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{card.value || 0}</p>
          </MotionDiv>
        ))}
      </div>
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default RewardsSection;
