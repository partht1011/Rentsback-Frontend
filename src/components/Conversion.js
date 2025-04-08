"use state";
import { useState } from "react";

export default function ConversionTab() {
  const [usdc, setUsdc] = useState("");
  const [euro, setEuro] = useState("");

  // Hardcoded exchange rate (Update manually when needed)
  const exchangeRate = 0.92; // Example: 1 USDC = 0.92 EUR

  const convert = (value) => {
    setUsdc(value);
    setEuro(value * exchangeRate);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full  mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        USDC to EUR Converter
      </h2>

      <input
        type="number"
        placeholder="Enter USDC amount"
        className="w-full border p-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={usdc}
        onChange={(e) => convert(e.target.value)}
      />

      <p className="text-gray-700 text-lg">
        Equivalent:{" "}
        <span className="font-bold">{euro ? euro.toFixed(2) : "0.00"} EUR</span>
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Exchange rate: 1 USDC = {exchangeRate} EUR
      </p>
    </div>
  );
}
