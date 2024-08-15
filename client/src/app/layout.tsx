import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConnectEmbed, ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Web3Provider } from "@/components/state-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crowfunding platform",
  description:
    "Starter template for using thirdweb SDK with Next.js App router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          <Web3Provider>
            <main
              className={`${inter.className} relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row text-white`}
            >
              <div className="sm:flex hidden mr-10 relative">
                <Sidebar />
              </div>

              <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm-pr5">
                <Navbar />
                {children}
              </div>
            </main>
          </Web3Provider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
