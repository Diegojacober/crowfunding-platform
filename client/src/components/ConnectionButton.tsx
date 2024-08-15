import { client } from "@/app/client";
import React, { useContext } from "react";
import { useConnect } from "thirdweb/react";
import { createWallet, injectedProvider } from "thirdweb/wallets";
import { StateContext, useWeb3 } from "./state-provider";
import Loader from "./Loader";

interface IConnectionButton {
  styles: string;
  isConnect: boolean;
}

function ConnectionButton(props: IConnectionButton) {
  const { connectWithWallet, loading } = useContext(StateContext);

  return (
    <button
      className={`font-epilogue font-semibold text-[16px] leading-[26px] min-h-52px px-4 rounded-[10px] cursor-pointer ${props.styles}`}
      onClick={() => connectWithWallet()}
    >
      {loading ? <Loader /> : "Connect"}
    </button>
  );
}

export default ConnectionButton;
