import { ConnectButton } from "@rainbow-me/rainbowkit";

const Layout = ({ children }: { children: any }) => {
  return (
    <div data-theme="sythwave">
      <div data-theme="synthwave" className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Pearl</a>
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
