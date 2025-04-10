import { networkIds } from "./networks";

export const TEST_MODE = true;
export const TEST_NETWORK = TEST_MODE ? "amoy" : "polygon";
export const TEST_CHAINID = networkIds[TEST_NETWORK];
