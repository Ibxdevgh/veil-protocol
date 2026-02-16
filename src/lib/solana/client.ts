import { Connection, clusterApiUrl } from "@solana/web3.js";
import { RPC_URL, SOLANA_NETWORK } from "@/lib/constants";

let connection: Connection | null = null;

export function getConnection(): Connection {
  if (!connection) {
    const endpoint =
      SOLANA_NETWORK === "devnet"
        ? RPC_URL || clusterApiUrl("devnet")
        : RPC_URL || clusterApiUrl("mainnet-beta");
    connection = new Connection(endpoint, "confirmed");
  }
  return connection;
}

export function getExplorerUrl(
  signature: string,
  network: string = SOLANA_NETWORK
): string {
  const cluster = network === "mainnet-beta" ? "" : `?cluster=${network}`;
  return `https://explorer.solana.com/tx/${signature}${cluster}`;
}
