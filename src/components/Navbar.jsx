"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Menu,
  X,
  Home,
  HelpCircle,
  Users,
  Coins,
  LineChart,
  LogIn,
  UserPlus,
  Calculator,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", name: "Home", icon: Home },
    { path: "/about", name: "About", icon: Users },
    { path: "/roadmap", name: "Roadmap", icon: LineChart },
    { path: "/tokenomics", name: "Tokenomics", icon: Coins },
    { path: "/faq", name: "FAQ", icon: HelpCircle },
    { path: "/reward-calculator", name: "Calculator", icon: Calculator },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[90%] bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-full z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center w-full h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-white space-x-2 mr-12">
              <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={100}
                  height={60}
                  className="w-full object-cover rounded-full"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-2 rounded-full transition duration-300"
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}

            {/* Login & Signup */}
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="flex items-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition duration-300"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Login
              </Link>
              <Link
                href="/signup"
                className="flex items-center text-white font-bold bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-full transition duration-300"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Signup
              </Link>
              <ConnectButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black backdrop-blur-lg border-t border-white/20 rounded-b-2xl shadow-xl md:hidden">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}

            {/* Login & Signup */}
            <Link
              href="/login"
              className="flex items-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </Link>
            <Link
              href="/signup"
              className="flex items-center text-white font-bold bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Signup
            </Link>
            <ConnectButton />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
