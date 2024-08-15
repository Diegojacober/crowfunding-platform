"use client";

import { client } from "@/app/client";
import { pid } from "process";
import React, { createContext, useContext, useState } from "react";
import {
  ContractOptions,
  getContract,
  prepareContractCall,
  readContract,
  resolveMethod,
  sendTransaction,
  toEther,
} from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useActiveAccount, useConnect } from "thirdweb/react";
import { Account, createWallet, WalletId } from "thirdweb/wallets";

type WalletOption = {
  name: string;
  // To get the wallet ID, refer to this link: https://portal.thirdweb.com/typescript/v5/supported-wallets
  walletId: WalletId;
};

const walletOptions: WalletOption[] = [
  {
    name: "Metamask",
    walletId: "io.metamask",
  },
  {
    name: "Coinbase",
    walletId: "com.coinbase.wallet",
  },
  {
    name: "Rabby",
    walletId: "io.rabby",
  },
  {
    name: "WalletConnect",
    walletId: "walletConnect",
  },
];

interface StateContextType {
  connectWithWallet: Function;
  publishCampaing: (form: CampaignType, account: Account) => void;
  loading: boolean;
  contract: Readonly<ContractOptions<[]>>;
  donate: Function;
  getDonations: Function;
  getTotalDonations: Function;
}

export type CampaignType = {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
};

export const StateContext = createContext<StateContextType>({
  connectWithWallet: (walletId: WalletId) => {},
  publishCampaing: (form: CampaignType, account: Account) => {},
  loading: false,
  contract: getContract({
    address: "0x6BB4656290cb6d17b08C623fCcf78B3564E14Bf1",
    client: client,
    chain: sepolia,
  }),
  getDonations: () => {},
  donate: () => {},
  getTotalDonations: () => {},
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { connect } = useConnect();
  const [loading, setLoading] = useState<boolean>(false);
  const contract = getContract({
    address: "0x6BB4656290cb6d17b08C623fCcf78B3564E14Bf1",
    client: client,
    chain: sepolia,
  });
  const account = useActiveAccount();

  const publishCampaing = async (form: CampaignType, account: Account) => {
    const transaction = prepareContractCall({
      contract,
      method: resolveMethod("createCampaign"),
      params: [
        account!.address,
        form!.title,
        form!.description,
        BigInt(Math.round(parseFloat(form!.target) * 100)),
        new Date(form!.deadline).getTime(),
        form!.image,
      ],
    });

    await sendTransaction({
      account: account!,
      transaction,
    })
      .then((resp) => {
        console.log(resp);
        return resp;
      })
      .catch((e) => {
        console.log("err: \n\n", e);
      });
  };

  function waitFor(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const donate = async (pId: number, amount: bigint) => {
    const transaction = prepareContractCall({
      contract,
      method: resolveMethod("donateToCampaign"),
      params: [pId],
      value: amount,
    });
    await sendTransaction({
      account: account!,
      transaction,
    })
      .then((resp) => {
        console.log(resp);
        return resp;
      })
      .catch((e) => {
        console.log("err: \n\n", e);
      });
  };

  const getDonations = async (pId: number) => {
    const donations = await readContract({
      contract,
      method: resolveMethod("getDonators"),
      params: [pId],
    });
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: toEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const getTotalDonations = async (pId: number) => {
    const donations = await readContract({
      contract,
      method: resolveMethod("getDonators"),
      params: [pId],
    });
    const numberOfDonations = donations[0].length;
    let totalDonations = BigInt(0);

    for (let i = 0; i < numberOfDonations; i++) {
      totalDonations += BigInt(donations[1][i].toString());
    }

    return totalDonations;
  };

  const connectWithWallet = (walletId: WalletId) => {
    connect(async () => {
      const wallet = createWallet("io.metamask"); // pass the wallet id

      setLoading(true);

      await wallet.connect({ client });
      await waitFor(2000);

      setLoading(false);

      return wallet;
    });
  };

  return (
    <StateContext.Provider
      value={{
        connectWithWallet,
        publishCampaing,
        loading,
        contract,
        getDonations,
        donate,
        getTotalDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useWeb3 = () => useContext(StateContext);
