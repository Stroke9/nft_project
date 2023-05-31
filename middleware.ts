import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./src/utils/auth";

export async function middleware(req: NextRequest) {
  if (req.method != "POST") return NextResponse.next();
  console.log("exec middleware");

  const authHeaders = req.headers.get("authorization");
  if (!authHeaders || !authHeaders.startsWith("Bearer")) return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  const token = authHeaders.split(" ")[1];

  const verifyToken = token && await verifyAuth(token).catch(err => console.error(err))
  if (!verifyToken) return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  return NextResponse.next()
}

export const config = {
  matcher: "/api/nft/favorite"
}