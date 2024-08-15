"use client";
import React, { useEffect, useState } from "react";
import { getContract, readContract, resolveMethod, toEther } from "thirdweb";
import { client } from "../client";
import { sepolia } from "thirdweb/chains";
import DisplayCampaings from "@/components/DisplayCampaings";

function Home() {
  const contract = getContract({
    address: "0x6BB4656290cb6d17b08C623fCcf78B3564E14Bf1",
    client: client,
    chain: sepolia,
  });

  const [campaings, setCampaings] = useState([]);

  useEffect(() => {
    const getCampaings = async () => {
      const data = await readContract({
        contract,
        method: resolveMethod("getCampaigns"),
        params: [],
      });

      return data;
    };
    async function get() {
      const campaings = await getCampaings();
      const parsedCampaings = campaings.map((campaing, i) => ({
        owner: campaing.owner,
        title: campaing.title,
        target: toEther(campaing.target).toString(),
        deadline: Number(campaing.deadline),
        amountCollected: toEther(campaing.amountCollected).toString(),
        image: campaing.image,
        pId: i + 1,
      }));
      localStorage.setItem("@campaings", JSON.stringify(parsedCampaings));
      setCampaings(parsedCampaings);
    }
    get();
  }, []);

  return (
    <>
      <DisplayCampaings campaings={campaings} title="All Campaings" />
    </>
  );
}

export default Home;
