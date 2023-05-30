import { NftMultiSchema } from "../schema/nft";

export const fetchAwaitCatcher = async <T>(promise: Promise<Response>) => {
  try {
    const data = await promise;
    const data_1: T = await data.json();
    const myVar: [null, T] = [null, data_1];
    return myVar;
  } catch (error) {
    console.error(error);
    const myVar: [unknown, null] = [error, null];
    return await Promise.resolve(myVar);
  }
}

export const fetchNftFromDB = async () => {
  const data = await fetch("/api/nft/favorite");
  const data_1 = await data.json();
  return NftMultiSchema.parse(data_1);
}


