import { getJwtSecretKey } from "@/src/utils/auth";
import { utils } from "ethers";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req: NextRequest) => {
  const { address, message, signature } = await req.json();
  const verify = utils.verifyMessage(message, signature);
  if (verify.toLocaleLowerCase() != address.toLocaleLowerCase()) return NextResponse.json({ verify: false }, { status: 401 });
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(uuidv4())
    .setIssuedAt()
    .setExpirationTime('30s')
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  return NextResponse.json({ token, verify: true })
};