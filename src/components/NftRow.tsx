import Image from "next/image";
import { NftType } from "../schema/nft";
import { FaEye } from "react-icons/fa";


const NftRow = (props: { nft: NftType, index: number }) => {
  let { token_id, likedAddresses, name, image_url } = props.nft;

  const formatLikedAddresses = likedAddresses.map((nft, index) => {
    let start = nft.substring(0, 4);
    let end = nft.substring(nft.length - 4);
    if (likedAddresses.length - 1 == index) return `${start}...${end}`;
    return `${start}...${end} | `
  })

  //let customClass = props.index % 2 === 0 ? "" : "bg-slate-600";
  return (
    <>
      <div className="grid grid-cols-1 p-2 items-center rounded-xl bg-slate-600">
        <div className="grid grid-cols-3 items-center">
          <div className="col-span-1 row-span-2">
            <Image className="rounded-md" alt={name} width={100} height={100} src={image_url} />
          </div>
          <div className="col-span-2">{name}</div>
          <div className="col-span-2">Likes: {likedAddresses.length}</div>
        </div>
        <div className="relative mt-3">
          <div className="flex justify-between">
            <p className="bg-slate-600 whitespace-nowrap overflow-hidden text-ellipsis" >{formatLikedAddresses.join(" ")}</p>
            <div className="group">
              <div className="cursor-pointer ml-3"><FaEye size={20}/></div>
              <div className="bg-slate-400 p-1 top-6 left-0 break-words rounded-lg pointer-events-none absolute w-full opacity-0 transition-opacity group-hover:opacity-100">
                {likedAddresses.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NftRow;