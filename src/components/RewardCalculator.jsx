"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const countryCurrencyMap = {
  USA: "$",
  Germany: "€",
  UK: "£",
  India: "₹",
  Japan: "¥",
  Canada: "$",
};

export default function RewardCalculator() {
  const [country, setCountry] = useState("USA");
  const [dailyRent, setDailyRent] = useState(20);
  const [tokenPrice, setTokenPrice] = useState(0.5);
  const [planPercentage, setPlanPercentage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const plans = [5, 10, 20];
  const currencySymbol = countryCurrencyMap[country] || "$";

  function calculateTokens(dailyRent, tokenPrice, planPercentage) {
    let tokensPerMonth =
      ((dailyRent * (planPercentage / 100)) / tokenPrice) * 30;
    let tokensPerYear = tokensPerMonth * 12;
    return { tokensPerMonth, tokensPerYear };
  }

  const { tokensPerMonth, tokensPerYear } = calculateTokens(
    dailyRent,
    tokenPrice,
    planPercentage
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <button
        className="w-full flex justify-between items-center p-4 bg-blue-600 text-white rounded-lg font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        Reward Calculator
        <ChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Token Reward Calculator
          </h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Select Country:</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {Object.keys(countryCurrencyMap).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Monthly Rent (including HOA) ({currencySymbol}):
            </label>
            <input
              type="number"
              value={dailyRent}
              onChange={(e) => setDailyRent(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Token Price ({currencySymbol}):
            </label>
            <input
              type="number"
              value={tokenPrice}
              onChange={(e) => setTokenPrice(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Select Plan Percentage:
            </label>
            <select
              value={planPercentage}
              onChange={(e) => setPlanPercentage(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            >
              {plans.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}%
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-center">Earnings:</h3>
            <div className="bg-gray-100 p-4 rounded text-center">
              <p>
                📅 <strong>Per Month:</strong> {tokensPerMonth.toFixed(2)}{" "}
                tokens
              </p>
              <p>
                📆 <strong>Per Year:</strong> {tokensPerYear.toFixed(2)} tokens
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
