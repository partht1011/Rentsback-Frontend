"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      console.error("Invalid verification link");
    }
  }, [token]);

  const verifyEmail = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://rentsback-backend.onrender.com/api/auth/verify?token=${token}`
      );
      if (res.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <p className="text-center mb-6">
        Click the button below to verify your email.
      </p>
      <Button onClick={verifyEmail} disabled={loading || !token}>
        {loading ? "Verifying..." : "Verify Email"}
      </Button>
    </div>
  );
};

// ✅ Wrapping in <Suspense> to prevent Next.js 15 issue
export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
