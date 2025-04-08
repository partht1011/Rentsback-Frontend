"use client";

import { useState } from "react";
import Link from "next/link";
import { useLogin } from "@/hooks/auth/useAuthActions"; // Your custom hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Using the TanStack Query mutation hook
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    login({ email, password }); // Call the mutation
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-black via-[#130fa3] to-black">
        <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl text-white">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to Your Account
          </h2>

          {/* Display error message if exists */}
          {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
                {error.response?.data?.message || "Login failed"}
              </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-1">Email</label>
              <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
              />
            </div>

            <div>
              <label className="block text-white/80 mb-1">Password</label>
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
              />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isPending}
            >
              {isPending ? (
                  <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
              ) : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-white/80">
            Don&rsquo;t have an account?{" "}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Login;