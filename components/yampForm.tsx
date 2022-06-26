import { useAppContext } from "@/context/appcontext";
import { useState } from "react";
import { useContractWrite, useSigner } from "wagmi";
import PEARL_CONTRACT from "../pearl_abi.json";

type SMTPData = {
  success: boolean;
  url: string;
  title: string;
  message: string;
};

const YampForm = () => {
  const [server, setServer] = useState<string>("127.0.0.1");
  let { contract_address } = useAppContext(); 
  const { data: signer } = useSigner();

  const { writeAsync } = useContractWrite(
    {
      addressOrName: contract_address,
      contractInterface: PEARL_CONTRACT,
      signerOrProvider: signer,
    },
    "setYampServer",
  );

  //contract code
  //https://github.com/gracew/pearl-contracts/blob/f2827baadb7388ad98a9bc1111ddafb2e98af0b3/contracts/Pearl.sol#L70
  const setYampServer = async () => {
    try {
      await writeAsync({
        args: [server],
      });

      console.log("Done setting server!");
    } catch (e) {
      console.log("FUCK. + " + JSON.stringify(e));
    } 
  };

  return (
    <div>
      <div className="form-control w-full my-5 input-bordered ">
        <label className="label">
          <span className="label-text">Server</span>
        </label>
        <input
          type="text"
          value={server}
          onChange={(e) => setServer(e.target.value)}
          placeholder="127.0.0.1"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="h-10" />
      <button onClick={setYampServer} className="btn btn-primary">
        Save
      </button>
    </div>
  );
};

export default YampForm;
