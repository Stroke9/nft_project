import { z } from "zod";

// Schema
export const NftSchema = z.object({
  token_id: z.string(),
  likedAddresses: z.array(
    z.string()
  ),
  name: z.string(),
  image_url: z.string()
})
export const NftMultiSchema = z.array(NftSchema);

//Response schema
export const NftResponseSchema = NftSchema;
export const NftMultiResponseSchema = z.object({
  all: NftMultiSchema,
});

//Type
export type NftType = z.infer<typeof NftSchema>;