import { z } from "zod";

// Schema
export const OpenseaCollectionSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  assets: z.array(
    z.object({
      token_id: z.string(),
      image_url: z.string(),
      name: z.string(),
      description: z.string(),
    })
  )
})
export const OpenseaCollectionMultiSchema = z.array(OpenseaCollectionSchema);

//Response schema
export const OpenseaCollectionResponseSchema = OpenseaCollectionSchema;
export const OpenseaCollectionMultiResponseSchema = z.object({
  all: OpenseaCollectionMultiSchema,
});