"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname, useRouter } from "next/navigation";
import { Providers } from "@/components/WalletProvider";
import { AuthProvider } from "@/context/AuthContext";
import { CookieConsent } from "@/components/CookieConsent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import Cookies from "js-cookie";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/adminpanel");
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    useEffect(() => {
        // Check for token on initial render and route changes
        const token = Cookies.get("token");

        // If no token and trying to access protected route, redirect to login
        if (!token && !isAuthPage && isDashboard) {
            router.push("/login");
        }
    }, [pathname, isAuthPage, isDashboard, router]);

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    {!isDashboard && <Navbar />}
                    {children}
                    {!isDashboard && <Footer />}
                </AuthProvider>
            </QueryClientProvider>
        </Providers>
        <CookieConsent />
        </body>
        </html>
    );
}