"use client";

import MetaMaskOnboarding from "@metamask/onboarding";
import { fetchAwaitCatcher } from "@/src/utils/fetcher";
import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../context/user";
import { optionsConfig } from "../utils/toast";

declare var window: any;

const signMessagePromise = (address: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const [errorRes, res] = await fetchAwaitCatcher<{ nonce: string }>(fetch("/api/auth/nonce", {
      method: "POST",
      body: JSON.stringify({ address })
    }))
    if (errorRes || !res) return reject("ERROR !");

    const { nonce } = res;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const message = `
    Hello,
    You need to sign to be able to add nft on your favorite
    
    Nonce: ${nonce}
    `;
    const signature = await signer.signMessage(message);

    const [errorResp, resp] = await fetchAwaitCatcher<{ token: string, verify: boolean }>(fetch("/api/auth/verify-message", {
      method: "POST",
      body: JSON.stringify({ address, message, signature })
    }))
    if (errorResp || !resp) return reject('ERROR !');

    const { token, verify } = resp;
    if (!verify) return reject('Invalid token')
    return resolve(token);
  })
}

export const signMessageRequest = async (account: string) => {
  return await toast.promise(
    signMessagePromise(account),
    {
      pending: "Connecting account...",
      success: "Account connected",
      error: "An error occured"
    },
    optionsConfig
  );
}

const Metamask = () => {
  const [buttonText, setButtonText] = useState('Click here to install MetaMask!');
  const onboarding = useRef<MetaMaskOnboarding>();
  const { account, setAccount } = useUserContext();

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account.address) {
        if (onboarding.current) onboarding.current.stopOnboarding();
      } else {
        setButtonText('Connect MataMask!');
      }
    }
  }, [account]);

  useEffect(() => {
    if (!onboarding.current) onboarding.current = new MetaMaskOnboarding();
    if (MetaMaskOnboarding.isMetaMaskInstalled()) window.ethereum.on('accountsChanged', setAccount);
  }, []);

  const handleMetamask = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      /* let account: [string] = window.ethereum._state.accounts;
      if (!account.length) return window.ethereum.request({ method: 'eth_requestAccounts' }); */
      //let token = await signMessageRequest(account[0])
      setAccount(false);
    } else {
      if (onboarding.current) onboarding.current.startOnboarding();
    }
  };

/*   const setNewAccount = async (newAccount: [string]) => {
    if (newAccount.length) {
      let token = sessionStorage.getItem(newAccount[0]);
      if (!token) token = await signMessageRequest(newAccount[0])
      setAccount({ address: newAccount[0], token });
    } else {
      setAccount({ address: "", token: "" });
      window.ethereum.removeListener('accountsChanged', setNewAccount);
    }
  } */

  return (
    <div className="text-right">
      <button onClick={handleMetamask} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 w-6 h-6">
        <Image
          className="mr-2"
          src="/metamask.svg"
          alt="Metamask Logo"
          width={24}
          height={24}>
        </Image>
        {buttonText}
      </button>
    </div>
  )
}

export default Metamask