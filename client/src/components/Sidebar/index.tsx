"use client";

import { navlinks } from "@/constants";
import { logo, sun } from "@public/assets";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Icon from "../Icon";
import { useActiveWallet } from "thirdweb/react";

function Sidebar() {
  const router = useRouter();
  const [isActive, setisActive] = useState<string>("dashboard");
  const wallet = useActiveWallet();
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link href="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              styles="w-[52px] h-[52px] bg-[#2c2f32]"
              {...link}
              isActive={isActive}
              handleClick={
                link.name == "logout"
                  ? () => {
                      wallet?.disconnect();
                    }
                  : () => {
                      if (!link.disabled) {
                        setisActive(link.name);
                        router.push(link.link);
                      }
                    }
              }
            />
          ))}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
}

export default Sidebar;
