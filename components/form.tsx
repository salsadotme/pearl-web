import { useState } from "react";
import { useSigner, useContractWrite, useSignMessage } from "wagmi";
import { contract_address } from "../consts";
import PEARL_CONTRACT from "../pearl_abi.json";

type SMTPData = {
  success: boolean;
  url: string;
  title: string;
  message: string;
};

const Form = () => {
  const [text, setText] = useState<string>("youoouoouuuuuuuu ");
  const [titleText, setTitleText] = useState<string>("lets git this shit");
  const [data, setData] = useState<SMTPData>();
  const [messageHash, setMessageHash] = useState<string>();
  const [signedMessage, setSignedMessage] = useState<string>();

  const { data: signer } = useSigner();

  const { writeAsync: getMessageHash } = useContractWrite(
    {
      addressOrName: contract_address,
      contractInterface: PEARL_CONTRACT,
      signerOrProvider: signer,
    },
    "getMessageHash",
    {
      onSettled(data, error) {
        console.log("Get Hash Settles", data, error);
      },
      onSuccess(data) {
        console.log("Success!!");
      },
    }
  );

  const { data: signedData, signMessageAsync } = useSignMessage();

  const sendMail = async (thisMessageHash: string, messageSig: string) => {
    try {
      let blob = {
        title: titleText,
        message: text + " " + thisMessageHash + " " + messageSig,
      };

      let data: SMTPData = await fetch("http://localhost:3000/api/sendSMTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blob),
      }).then((res) => res.json());

      console.log(data);

      setData(data);

      console.log("Mail sent!");
    } catch (e) {
      console.log("FUCK -> " + JSON.stringify(e));
    }
  };

  //contract code
  //https://github.com/gracew/pearl-contracts/blob/f2827baadb7388ad98a9bc1111ddafb2e98af0b3/contracts/Pearl.sol#L70
  const hashMessage = async () => {
    try {
      let message = text;

      let messageHashed = await getMessageHash({
        args: [
          "0xdA76d71f3127f0C3A26E5C574aB873544248Ca84", //emperor ming
          10, ///amount
          message, //message
          1, //nonce
        ],
      });

      console.log("Done in HashMessage! -> " + JSON.stringify(messageHashed));
      setMessageHash(String(messageHashed));
      return String(messageHashed);
    } catch (e) {
      console.log("FUCK. + " + JSON.stringify(e));
    } finally {
    }
  };

  const sign = async (thisMessageHash: string) => {
    if (thisMessageHash) {
      let signedMessage = await signMessageAsync({ message: thisMessageHash });

      setSignedMessage(signedMessage);
      console.log("Signed too!!!");
      return signedMessage;
    } else {
      console.log("No Message hash....");
    }
  };

  const doAllTheThings = async () => {
    try {
      let derp = await hashMessage();
      console.log("derp?" + derp);
      if (derp) {
        let resFromSign = await sign(derp);
        if (resFromSign) {
          await sendMail(derp, resFromSign);
        } else {
          console.log("no res from sign...");
        }
      } else {
        console.log("No res from hashMessage....");
      }
    } catch (E) {
      console.log("Try all failed");
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-bold">Create Anouncment</h1>
      <div className="flex">
        <div className=" w-full my-5 input-bordered flex-1 mr-5">
          <label className="label">
            <span className="label-text">Notification Title</span>
          </label>
          <input
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            placeholder="Hello Bears! Something exciting!"
            className="input input-primary w-full"
          />
        </div>
        <div className="flex-1 my-5 flex flex-col">
          <div className="flex-1" />
          <select className="select select-primary w-full  max-w-xs">
            <option disabled selected>
              Notification Category
            </option>
            <option>New NFT Drop</option>
            <option>Mint Allowlist</option>
            <option>Utility Announcements</option>
            <option>Jobs</option>
            <option>News Coverage</option>
            <option>Security</option>
            <option>General</option>
          </select>
        </div>
      </div>
      <label className="label">
        <span className="label-text">Message Content</span>
      </label>
      <textarea
        className="textarea textarea-primary w-full h-40"
        placeholder="We are giving away free stuff!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="h-10" />
      <button onClick={doAllTheThings} className="btn btn-primary">
        Send
      </button>
      {JSON.stringify(data)}
    </div>
  );
};

export default Form;
