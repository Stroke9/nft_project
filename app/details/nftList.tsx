"use client";

import Loader from "@/src/components/Loader";
import NftRow from "@/src/components/NftRow";
import { NftType } from "@/src/schema/nft";
import { fetchNftFromDB } from "@/src/utils/fetcher";
import { useQuery } from "@tanstack/react-query";


const DetailsPage = () => {
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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {
        sortedData.map((nft, index) => {
          return <NftRow key={nft.token_id} nft={nft} index={index} />
        })
      }
    </div>
  )
}

export default DetailsPage