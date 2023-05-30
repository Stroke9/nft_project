/* 

filter sur / (name, address)
filter sur /detail
autoriser le like que quand connecter
voir pour le image ? Ratio ? 

*/
import Nfts from "@/src/components/Nfts";
import SearchInput from "@/src/components/SearchInput";

export default function Home() {
  return (
    <main>
      <SearchInput/>
      <Nfts />
    </main>
  )
}
