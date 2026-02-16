import { PublicKey } from "@solana/web3.js";
import { STEALTH_PROGRAM_ID } from "@/lib/constants";

export function deriveVaultPda(
  sender: PublicKey,
  nonce: number
): [PublicKey, number] {
  const nonceBuffer = Buffer.alloc(8);
  nonceBuffer.writeBigUInt64LE(BigInt(nonce));

  return PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), sender.toBuffer(), nonceBuffer],
    STEALTH_PROGRAM_ID
  );
}

export function deriveVaultAuthority(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("authority")],
    STEALTH_PROGRAM_ID
  );
}
