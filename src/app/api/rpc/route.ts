import { NextRequest, NextResponse } from "next/server";

const HELIUS_RPC_URL = process.env.HELIUS_RPC_URL;

export async function POST(req: NextRequest) {
  if (!HELIUS_RPC_URL) {
    return NextResponse.json(
      { error: "RPC endpoint not configured" },
      { status: 500 }
    );
  }

  const body = await req.json();

  const response = await fetch(HELIUS_RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
