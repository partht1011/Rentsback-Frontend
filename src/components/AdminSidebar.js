"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, LogOut, Coins } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/useLogout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { mutate: logout, isPending } = useLogout();

  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target) &&
          isMobileMenuOpen &&
          window.innerWidth < 1024
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
      <>
        {/* Mobile Menu Button */}
        <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden fixed top-4 left-4 p-2 bg-[#130fa3] text-white rounded-md z-20"
            aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Overlay - Only visible when mobile menu is open */}
        {isMobileMenuOpen && (
            <div
                className="lg:hidden fixed inset-0 bg-black/30 z-30 transition-opacity duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />
        )}

        {/* Sidebar */}
        <aside
            ref={sidebarRef}
            className={`fixed lg:relative inset-y-0 left-0 w-64 h-screen flex flex-col bg-[#130fa3] text-white z-40
            transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0`}
        >
          {/* Header with close button */}
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                  src="/images/sidebarlogo.png"
                  alt="Logo"
                  width={100}
                  height={40}
                  className="w-full h-12 object-cover rounded-full"
              />
            </div>
            <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-1 rounded-full hover:bg-indigo-800"
                aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <Link
                href="/adminpanel"
                className="block py-1 mb-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
                href="/adminpanel/managment"
                className="block py-1 mb-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Management
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Transaction Details</AccordionTrigger>
                <AccordionContent>
                  <Link
                      href="/adminpanel/tokenHistory"
                      className="block p-2 mb-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                  >
                    Token History
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>All Records</AccordionTrigger>
                <AccordionContent>
                  <Link
                      href="/adminpanel/request"
                      className="block p-2 mb-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                  >
                    Initial Request
                  </Link>
                </AccordionContent>
                <AccordionContent>
                  <Link
                      href="/adminpanel/renewal"
                      className="block p-2 mb-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                  >
                    Renewal
                  </Link>
                </AccordionContent>
                <AccordionContent>
                  <Link
                      href="/adminpanel/records"
                      className="block p-2 mb-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                  >
                    Records
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
                href="/adminpanel/settings"
                className="block py-1 mb-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Settings
            </Link>

            <Button
                variant="destructive"
                className="flex items-center gap-2 w-full"
                onClick={() => logout()}
                disabled={isPending}
            >
              <LogOut className="w-5 h-5" />
              {isPending ? "Logging out..." : "Logout"}
            </Button>
          </nav>
        </aside>
      </>
  );
}