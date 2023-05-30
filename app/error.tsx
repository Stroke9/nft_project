"use client"

import Link from "next/link";
import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl">{error.message || "Something went wrong! 🥲"}</h2>
      <div className="my-6 flex gap-12">
        <button onClick={() => reset()}>Try again</button>
        <Link href={"/"}>Go back home 👍</Link>
      </div>
    </div>
  )
}

export default Error
