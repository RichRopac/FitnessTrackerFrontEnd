import React, { useState } from "react";
import { postMessage } from "../api";

const MessageOwner = (props) => {
  const { singlePost, setMessageOwnerFlag } = props;
  const [content, setContent] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const message = {
      content: content,
    };
    postMessage(token, singlePost._id, message);
    setMessageOwnerFlag(false);
  };
  console.log(singlePost.title);
  return (
    <div className="box">
      {`Message The User`}
      Post Title: {singlePost.title}
      <form onSubmit={handleSubmit} className="box form">
        <textarea
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      <button
        onClick={() => {
          setMessageOwnerFlag(false);
        }}
      >
        Cancel Message
      </button>
    </div>
  );
};

export default MessageOwner;
