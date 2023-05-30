import mongoose, { Document, Schema } from 'mongoose';

export interface INft {
  token_id: string,
  likedAddresses: [string],
  name: string,
  image_url: string
}

export interface INftModel extends INft, Document { }

const NftSchema: Schema = new Schema(
  {
    token_id: { type: String, required: true, unique: true },
    likedAddresses: [{ type: String, required: true }],
    name: { type: String, required: true },
    image_url: { type: String, required: true }
  }
);

export default mongoose.model<INftModel>('Nft', NftSchema);