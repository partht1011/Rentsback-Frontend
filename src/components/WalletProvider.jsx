"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi"; // ✅ Use WagmiProvider instead of WagmiConfig
import { polygon, polygonAmoy } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Configure WalletConnect projectId
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("WalletConnect projectId is missing. Check your .env file");
}

const config = getDefaultConfig({
  appName: "Pigeon",
  projectId,
  chains: [polygon, polygonAmoy],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      {" "}
      {/* ✅ Use WagmiProvider */}
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={[polygon, polygonAmoy]}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
