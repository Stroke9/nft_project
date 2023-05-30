import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req: NextRequest) => {
  const nonce = uuidv4();

  return NextResponse.json({nonce})
};