import React from "react";
import { redirect, RedirectType } from "next/navigation";
import FundCard from "./FundCard";

interface IDisplayCampaings {
  campaings: any[];
  title: string;
}

const DisplayCampaings = ({ campaings, title }: IDisplayCampaings) => {
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-left">
        {title} ({campaings.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {campaings.length == 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaings yet
          </p>
        )}

        {campaings.length > 0 &&
          campaings.map((campaing) => (
            <FundCard
              link={`/campaings/${campaing.pId}`}
              key={campaing.pId}
              campaing={campaing}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaings;
