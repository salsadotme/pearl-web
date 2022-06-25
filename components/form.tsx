import { useState } from "react";
import { useSigner, useAccount, useContractWrite } from "wagmi";
import { contract_address } from "../consts";
import PEARL_CONTRACT from "../pearl_abi.json";
import { generateNonce } from "siwe";

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

  const { data: signer } = useSigner();
  const { data: account } = useAccount();

  const { write: getMessageHash } = useContractWrite(
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

  const sendMail = async () => {
    try {
      let blob = { title: titleText, message: text };

      let data: SMTPData = await fetch("http://localhost:3000/api/sendSMTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blob),
      }).then((res) => res.json());

      console.log(data);

      setData(data);
    } catch (e) {
      console.log("FUCK -> " + JSON.stringify(e));
    }
  };

  //contract code
  //https://github.com/gracew/pearl-contracts/blob/f2827baadb7388ad98a9bc1111ddafb2e98af0b3/contracts/Pearl.sol#L70
  const hashMessage = async () => {
    try {
      let message = text;
      let nonce = generateNonce();
      console.log("Nonce -> " + nonce);

      let messageHashed = await getMessageHash({
        args: [
          "0xdA76d71f3127f0C3A26E5C574aB873544248Ca84", //emperor ming
          10, ///amount
          message, //message
          1, //nonce
        ],
      });

      console.log("Done in HashMessage!");
      console.log(JSON.stringify(messageHashed));
    } catch (e) {
      console.log("FUCK. + " + JSON.stringify(e));
    } finally {
    }
  };

  const sign = () => {};

  const doAllTheThings = async () => {
    try {
      await hashMessage();
      await sendMail();
    } catch (E) {
      console.log("Try all failed");
    }
  };

  return (
    <div>
      <div className="form-control w-full my-5 input-bordered ">
        <label className="label">
          <span className="label-text">Notification Title</span>
        </label>
        <input
          type="text"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
          placeholder="Hello Bears! Something exciting!"
          className="input input-bordered w-full max-w-xs"
        />
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
