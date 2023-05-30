"use client";

import Loader from "@/src/components/Loader";
import NftRow from "@/src/components/NftRow";
import { useUserContext } from "@/src/context/user";
import { NftType } from "@/src/schema/nft";
import { fetchNftFromDB } from "@/src/utils/fetcher";
import { useQuery } from "@tanstack/react-query";


const DetailsPage = () => {
  const { account } = useUserContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["nfts"],
    queryFn: fetchNftFromDB
  })

  if (isLoading) return <Loader />;
  if (isError) return <div>Error !!!</div>

  const filterData: NftType[] = data.filter(el => el.likedAddresses.length != 0);
  const sortedData: NftType[] = filterData.sort((a, b): number => {
    return b.likedAddresses.length - a.likedAddresses.length;
  })

  return (
    /*     <div className="font-bold">
          <div className="grid grid-cols-10 border-b px-4 py-5 items-center">
            <div className="col-span-1">Image</div>
            <div className="col-span-3">Title</div>
            <div className="col-span-1">Number of Likes</div>
            <div className="col-span-5">Liked Adresses</div>
          </div> */
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {
        sortedData.map((nft, index) => {
          return <NftRow key={nft.token_id} nft={nft} index={index} />
        })
      }
    </div>
    /* </div> */
  )
}

export default DetailsPage