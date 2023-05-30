'use client';

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { signMessageRequest } from "../components/Metamask";

declare var window: any;

type accountType = {
  address: string,
  token: string
}

interface ContextProps {
  account: accountType,
  setAccount: (tokenState?: boolean) => Promise<void>
}

const UserContext = createContext<ContextProps>({
  account: {
    address: "",
    token: ""
  },
  setAccount: (): Promise<void> => new Promise((resolve, reject) => { })
})

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, _setAccount] = useState<accountType>({ address: "", token: "" });

  const setAccount = async (tokenState: boolean = true) => {
    let account: [string] = window.ethereum._state.accounts;
    if (!account.length && tokenState) {
      _setAccount({ address: "", token: "" });
      return window.ethereum.removeListener('accountsChanged', setAccount);
    }
    if (!account.length && !tokenState) return window.ethereum.request({ method: 'eth_requestAccounts' });
    let token = sessionStorage.getItem(account[0]);
    if (!token || !tokenState) token = await signMessageRequest(account[0])
    _setAccount({ address: account[0], token });
  }

  // Init account on reload page
  useEffect(() => {
    const setAccountOnLoad = async () => {
      const connectedAccount = await window.ethereum.request({ method: 'wallet_getPermissions' });
      if (connectedAccount.length) {
        const address = connectedAccount[0].caveats[0].value[0];
        const token = sessionStorage.getItem(address);
        if (token) _setAccount({ address, token });
      }
    }
    setAccountOnLoad();
  }, []);


  useEffect(() => {
    if (account?.address && account.token) sessionStorage.setItem(account.address, account.token);
  }, [account]);


  return (
    <UserContext.Provider value={{ account, setAccount }}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => useContext(UserContext);