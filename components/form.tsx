import { useState } from "react";

const Form = () => {
  const [text, setText] = useState<string>();
  const [titleText, setTitleText] = useState<string>();

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
      <button class="btn btn-primary">Button</button>
    </div>
  );
};

export default Form;
