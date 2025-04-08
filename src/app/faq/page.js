"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Rentsback and how does it work?",
    answer:
      "Rentsback is a revolutionary platform that combines real estate rentals with blockchain technology. It allows tenants to earn Rcoin (REC) rewards while paying their rent, creating a unique value proposition in the rental market.",
  },
  {
    question: "What is Rcoin (REC)?",
    answer:
      "Rcoin (REC) is the native token of the Rentsback platform. It is earned through rent payments and can be used for various purposes within the ecosystem, including paying for platform services and accessing exclusive features.",
  },
  {
    question: "How are Rcoin rewards calculated?",
    answer:
      "Rcoin rewards are calculated based on your rental payments and length of tenancy. The exact amount depends on factors such as your rental amount, payment consistency, and the current reward rate.",
  },
  {
    question:
      'What is the "Frozen Period" and how does it affect Rcoin valuation?',
    answer:
      "The Frozen Period is an initial phase where Rcoin has a fixed value of €0.50. This period helps establish stability and allows the ecosystem to grow before transitioning to market-based pricing.",
  },
  {
    question: "How do I connect my wallet to Rentsback?",
    answer:
      'You can connect your Web3 wallet (like MetaMask) to Rentsback by clicking the "Connect Wallet" button in the dashboard. Follow the prompts to complete the connection process.',
  },
  {
    question: "What happens if my lease expires or I move?",
    answer:
      "Your earned Rcoins remain yours even after your lease expires or you move. You can continue to hold them, use them for other Rentsback services, or trade them once the frozen period ends.",
  },
  {
    question: "What are the risks associated with using Rcoin?",
    answer:
      "Like any cryptocurrency, Rcoin carries market risks. While we implement measures like the Frozen Period to maintain stability, values can fluctuate once trading begins. We recommend reading our risk disclosure document for full details.",
  },
  {
    question: "What exchanges is REC listed on?",
    answer:
      "Currently, REC is in its Frozen Period and not listed on exchanges. Once this period ends, we plan to list REC on major decentralized and centralized exchanges. Stay tuned for announcements.",
  },
];

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/20 py-4">
      <button
        className="flex justify-between items-center w-full text-left text-white/80 hover:text-white transition"
        onClick={onClick}
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-white/50" />
        ) : (
          <ChevronDown className="h-5 w-5 text-white/50" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-white/70"
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="relative min-h-screen flex items-center py-28 justify-center bg-black text-white px-4">
      {/* Lineart Background */}
      <div className="absolute inset-0 bg-[url('/lineart.svg')] bg-cover bg-center opacity-20 pointer-events-none"></div>

      <div className="max-w-3xl w-full relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-6 rounded-2xl">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
