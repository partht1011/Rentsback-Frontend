"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DarkThemeCalculator() {
  const [dailyRent, setDailyRent] = useState(20);
  const [tokenPrice, setTokenPrice] = useState(0.5);
  const [planPercentage, setPlanPercentage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const plans = [5, 10, 20];

  const countryCurrency = {
    USA: "$",
    UK: "\u00a3",
    EU: "\u20AC",
    India: "\u20B9",
  };

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
    <div className="relative min-h-screen py-4 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full p-6 bg-white/10 backdrop-blur-lg shadow-xl rounded-xl">
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
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full p-2 border border-white/20 bg-black/50 text-white rounded"
              >
                {Object.keys(countryCurrency).map((country) => (
                  <option key={country} value={country} className="bg-black">
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Monthly Rent (Including HOA) ({countryCurrency[selectedCountry]}
                ):
              </label>
              <input
                type="number"
                value={dailyRent}
                onChange={(e) => setDailyRent(parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-white/20 bg-black/50 text-white rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Token Price ({countryCurrency[selectedCountry]}):
              </label>
              <input
                type="number"
                value={tokenPrice}
                onChange={(e) => setTokenPrice(parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-white/20 bg-black/50 text-white rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Select Plan Percentage:
              </label>
              <select
                value={planPercentage}
                onChange={(e) => setPlanPercentage(parseInt(e.target.value))}
                className="w-full p-2 border border-white/20 bg-black/50 text-white rounded"
              >
                {plans.map((plan) => (
                  <option key={plan} value={plan} className="bg-black">
                    {plan}%
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-center">Earnings:</h3>
              <div className="bg-white/10 p-4 rounded text-center">
                <p>
                  📅 <strong>Per Month:</strong> {tokensPerMonth.toFixed(2)}{" "}
                  tokens
                </p>
                <p>
                  📆 <strong>Per Year:</strong> {tokensPerYear.toFixed(2)}{" "}
                  tokens
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
