import type { NextPage } from "next";
import type { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Home: NextPage = () => {
  return (
    <div data-theme="synthwave" className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Pearl</a>
      </div>
      <div className="flex-none">
        <ConnectButton />
      </div>
    </div>
  );
};

export default Home;
