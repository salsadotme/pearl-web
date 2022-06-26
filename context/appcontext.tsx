import React, { useState, createContext, useContext, useEffect } from "react";
import { useNetwork, chain } from "wagmi";

export interface AppContext {
  contract_address: string;
}

const AppContext = createContext<AppContext>({
  contract_address: "",
});

let cello_alfahores = "0xDb9129C91dB96e14d610ad5dAa06c0C7B782E0c3";
let polygon_mumbai = "0x0D0Ce610F0EbE2d3Fd46C1F6a65b4DdB6140674f";
let ethereum_rinkeby = "0x8A2bbff6C457468fBB8796Ad7AD44D23a5E395D0";
let optimism_kovan = "0xEd821C17e96a71082FB90d9DEEF1344E0c8e6f65";
let gnosis_testnet = "0xDb9129C91dB96e14d610ad5dAa06c0C7B782E0c3";

let liveChains = {
  77: gnosis_testnet,
  44787: cello_alfahores,
  [chain.polygonMumbai.id]: polygon_mumbai,
  [chain.rinkeby.id]: ethereum_rinkeby,
  [chain.optimismKovan.id]: optimism_kovan,
};

export interface Props {
  [propName: string]: any;
}

export const AppContextProvider = (props: Props) => {
  const { activeChain, data, pendingChainId, isSuccess } = useNetwork();
  const [contract_address, setContractAddress] = useState("");

  const value = {
    contract_address,
  };

  useEffect(() => {
    if (activeChain) {
      setContractAddress(liveChains[activeChain.id]);
      console.log(
        "Switch to contract address => " + liveChains[activeChain.id]
      );
      console.log("Working with " + activeChain.name + " now");
    } else {
      console.log("Hmmmm. chain data not switching?");
    }
  }, [isSuccess]);

  return <AppContext.Provider value={value} {...props} />;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(`useAppContext must be used within a AppContextProvider.`);
  }
  return context;
};
