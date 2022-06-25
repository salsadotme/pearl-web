import { useState } from "react";

type SMTPData = {
  success: boolean;
  url: string;
  title: string;
  message: string;
};

const Form = () => {
  const [text, setText] = useState<string>();
  const [titleText, setTitleText] = useState<string>();
  const [data, setData] = useState<SMTPData>();

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
  return (
    <div>
      <div className="form-control w-full my-5">
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
        <span className="label-text">Message Content </span>
      </label>
      <textarea
        className="textarea textarea-primary w-full h-40"
        placeholder="We are giving away free stuff!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="h-10" />
      <button onClick={sendMail} className="btn btn-primary">
        Button
      </button>
      {JSON.stringify(data)}
    </div>
  );
};

export default Form;
