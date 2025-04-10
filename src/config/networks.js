import { zeroAddress } from "viem";

export const networkIds = {
  polygon: 137,
  amoy: 80002,
};

const knownNetworks = {
  [networkIds.amoy]: {
    name: "Amoy",
    chainId: 80002,
    rpc: "https://polygon-amoy.drpc.org",
    wss: "wss://polygon-amoy-bor-rpc.publicnode.com",
    explorer: "https://amoy.polygonscan.com/",
  },
  [networkIds.polygon]: {
    name: "Polygon",
    chainId: 137,
    rpc: "https://polygon.drpc.org",
    wss: "wss://polygon.drpc.org",
    explorer: "https://polygonscan.com/",
  },
};

const knownContracts = {};

export const ExplorerLink = (chainId) => {
  return knownNetworks[chainId].explorer;
};

export const ChainIconLink = (chainId) => {
  return knownNetworks[chainId].icon;
};

export const getContractAddress = (chainId, name) => {
  try {
    return knownContracts[name][chainId];
  } catch (error) {
    return zeroAddress;
  }
};

export const tokenIds = {
  usdc: "usdc",
  rcoin: "rcoin",
};

const knownTokens = {
  usdc: {
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    addresses: {
      [networkIds.amoy]: "0x6AE33346e759922f289A9CEa4495b4D8F3F1dcFd",
      [networkIds.polygon]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    },
  },
  rcoin: {
    name: "Rcoin",
    symbol: "REC",
    decimals: 18,
    addresses: {
      [networkIds.amoy]: "0xdB0bd9F41f4158F324b249Cae97A75fF6C6754B5",
      [networkIds.polygon]: "0x1Fa7b3D0BADd0a47408159FB6CdE0D643f1EBdE8",
    },
  },
};

export const getToken = (chainId, symbol) => {
  try {
    return {
      ...knownTokens[symbol],
      addresses: undefined,
      address: knownTokens[symbol].addresses[chainId],
    };
  } catch (error) {
    return {
      name: "",
      symbol: "",
      decimals: 18,
      icon: "",
      address: zeroAddress,
    };
  }
};

export const getTokens = () => {
  return [knownTokens.usdc, knownTokens.rcoin];
};
