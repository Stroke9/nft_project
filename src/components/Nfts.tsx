"use client";

import Pagination from "@/src/components/Pagination";
import { useQueries } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { OpenseaCollectionResponseSchema } from "../schema/opensea";
import { fetchNftFromDB } from "../utils/fetcher";
import Loader from "./Loader";
import NftCard from "./NftCard";

type CurrentPageProps = {
  page: number,
  cursor: string | null
}

const fetchByCollection = async (cursor: string | null, searchQuery: string | null = null) => {
  const findByTokenIds = searchQuery ? `&token_ids=${searchQuery}` : "";
  const data = await fetch(`https://api.opensea.io/api/v1/assets?collection=20-mint-typewriter&limit=21&cursor=${cursor}${findByTokenIds}`);
  const data_1 = await data.json();
  return OpenseaCollectionResponseSchema.parse(data_1);
}

const Nfts = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPageProps>({ page: 1, cursor: "" });
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams.get("search") : null;

  const [opensea, nft] = useQueries({
    queries: [
      {
        queryKey: ["opensea", currentPage.page, searchQuery],
        queryFn: () => fetchByCollection(currentPage.cursor, searchQuery),
        keepPreviousData: true
      },
      {
        queryKey: ["nfts"],
        queryFn: fetchNftFromDB
      }
    ]
  })

  if (opensea.isLoading) return <div className="flex justify-center"><Loader /></div>;
  if (opensea.isError) return <div>Error !!!</div>;

  if (nft.isLoading) return <div className="flex justify-center"><Loader /></div>;
  if (nft.isError) return <div>Error !!!</div>;

  const currentNft = (token_id: string) => {
    let currentNft = nft.data.find(el => el.token_id == token_id);
    if (!currentNft) return null;
    return currentNft;
  }

  const openseaData = opensea.data;
  return (
    <>
      <div className=" mb-10">
        <h2 className="text-3xl">Mint collection printer</h2>
      </div>
      <div className="grid sm:grid-cols-3 items-center justify-center pb-20 gap-7">
        {opensea.isLoading && <Loader />}
        {openseaData.assets.length != 0
          ?
            openseaData.assets.map(openseaNft => (
              <NftCard key={openseaNft.token_id} {...openseaNft} currentNft={currentNft(openseaNft.token_id)} />
            ))
          : <div>No NFT</div>
        }
      </div>
      {openseaData.next &&
        <div className="flex items-center mx-auto justify-between mb-20">
          <Pagination
            currentPage={currentPage}
            totalItems={openseaData.assets.length}
            onPageChange={(page: any) => {
              setCurrentPage(page);
              window.scrollTo(0, 100);
            }}
            isPreviousData={opensea.isPreviousData}
            next={openseaData.next}
            previous={openseaData.previous}
            isFetching={opensea.isFetching}
          />
        </div>
      }
    </>
  );
};

export default Nfts;