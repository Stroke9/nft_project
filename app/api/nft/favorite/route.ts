import connectDB from "@/src/db/connectDb";
import Nft from "@/src/db/models/nfts.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectDB();
  const { token_id, name, image_url, likedAddresses, liked } = await req.json();
   
  const update = liked ?
    { $push: { likedAddresses: likedAddresses }, $setOnInsert: {name, image_url} } :
    { $pull: { likedAddresses: likedAddresses } };

  const reset = { likedAddresses: [] }

  return Nft.updateOne({ token_id }, update, { upsert: true })
    .then((nft) => NextResponse.json(nft, { status: 201 }))
    .catch((error) => NextResponse.json(error, { status: 500 }));
};

export const GET = async (req: NextRequest) => {
  await connectDB();
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  if (!id) {
    return Nft.find()
      .then((nfts) => NextResponse.json(nfts, { status: 200 }))
      .catch((error) => NextResponse.json(error, { status: 500 }));
  }
  return Nft.findOne({ token_id: id })
    .then((nft) => NextResponse.json(nft, { status: 200 }))
    .catch((error) => NextResponse.json(error, { status: 500 }));
};

export const PATCH = async (req: NextRequest) => { };

export const DELETE = async (req: NextRequest) => {
  await connectDB();
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");

  return Nft.findOneAndDelete({ token_id: id })
    .then((nft) => (nft ? NextResponse.json(nft, { status: 201 }) : NextResponse.json({ message: 'not found' }, { status: 404 })))
    .catch((error) => NextResponse.json(error, { status: 500 }));
};
