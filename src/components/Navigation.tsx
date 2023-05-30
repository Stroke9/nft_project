"use client";

import Link from "next/link";
import { useUserContext } from "../context/user";
import Metamask from "./Metamask";


const Navigation = () => {
  const { account } = useUserContext();

  const Connected = () => {
    let start = account?.address?.substring(0, 4);
    let end = account?.address?.substring(account?.address?.length - 4);
    const formatedAddress = `${start}...${end}`;

    return (
      <>
        <div className="group text-right">
          <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Connected as {formatedAddress}</button>
          <span className="bg-slate-400 p-1 rounded-lg pointer-events-none absolute sm:top-20 top-24 right-0 sm:right-48 w-max opacity-0 transition-opacity group-hover:opacity-100">
            {account?.address}
          </span>
        </div>
      </>
    )
  }

  return (
    <header className="py-8 mb-5">
      <div className="flex justify-between sm:items-center sm:flex-row flex-col-reverse">
        <div className="flex justify-between grow mt-5 sm:mt-0">
          <Link href="/">NFT Marketplace 🔥</Link>
          <Link className="sm:mr-5" href="/details">See favorite NFTs</Link>
        </div>
        {!account.address
          ? <Metamask />
          : <Connected />
        }
      </div>
    </header>
  )
}

//flex-col-reverse

export default Navigation;