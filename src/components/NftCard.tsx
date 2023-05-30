"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUserContext } from "../context/user";
import { NftType } from "../schema/nft";
import { fetchAwaitCatcher } from "../utils/fetcher";
import { toastError, toastSuccess } from "../utils/toast";
import { signMessageRequest } from "./Metamask";

type Nft = {
  token_id: string,
  image_url: string,
  name: string,
  description: string,
  currentNft: null | NftType
}

export default function NftCard({ token_id, image_url, name, description, currentNft }: Nft) {
  const { account, setAccount } = useUserContext();
  const [liked, setLiked] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!currentNft) return setLiked(false);
    if (account && currentNft.likedAddresses.includes(account.address)) {
      return setLiked(true)
    };
    return setLiked(false);

  }, [account])

  const mutation = useMutation({
    mutationFn: async () => {
      let data = await fetch("/api/nft/favorite", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${account.token}`
        },
        body: JSON.stringify({ token_id, likedAddresses: account.address, image_url, name, liked })
      })
      return await data.json();
    },
    onMutate: () => {
      setLiked(prevState => !prevState);
    },
    onError: () => {
      setLiked(prevState => !prevState);
      toastError("An error occurred");
    },
    onSuccess: async ({ error }) => {
      if (error == "invalid_token" ) {
        setLiked(prevState => !prevState);
        //let token = await signMessageRequest(account.address);
        setAccount(false);
      } else {
        let message = liked ? 'Nft correctly liked!' : 'Nft correctly unliked!';
        queryClient.invalidateQueries({ queryKey: ["nfts"] });
        toastSuccess(message);
      }
    }
  })

  const postFavoriteNft = async () => {
    if (!account.address) return toastError("You must login on Metamask!");
    mutation.mutate();
  }

  return (
    <div
      className="flex flex-col shadow-md shadow-sky-700 rounded-2xl border border-white/10 hover:scale-105 duration-200 cursor-pointer"
    >
      <div className="relative">
        <Image alt={name} width={500} height={604} priority={true} src={image_url} className="rounded-t-2xl" />
        <div className="absolute top-5 right-10 cursor-pointer" onClick={postFavoriteNft}>
          {liked
            ? <FaHeart size={30} color="red" />
            : <FaRegHeart size={30} />
          }
        </div>
      </div>
      <div className="text-sky-500 p-4 font-bold text-center">
        <a>{name}</a>
      </div>
    </div>

  )
}
