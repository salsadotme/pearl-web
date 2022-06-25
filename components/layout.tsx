import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from "../public/rainbow_pearl.svg";
import Image from "next/image";

const Layout = ({ children }: { children: any }) => {
  return (
    <div data-theme="synthwave">
      <div className="navbar bg-white">
        <div className="flex-1">
          <Image
            className="h-8 w-auto sm:h-10"
            src={Logo}
            height="50"
            width="50"
            alt="Pearl"
          />
          <a className="btn btn-ghost normal-case text-xl text-black">Pearl</a>
        </div>
        <div className="flex-none">
          <ConnectButton />
        </div>
      </div>

      <div className="min-h-screen max-w-5xl mx-auto px-6">{children}</div>
    </div>
  );
};

export default Layout;
