import React, { useState } from "react";
import { render } from "react-dom";
import { modifyPost } from "../api";

const ModPost = (props) => {
  const { singlePost, setModPostFlag } = props;
  const [title, setTitle] = useState(singlePost.title);
  const [description, setDescription] = useState(singlePost.description);
  const [price, setPrice] = useState(singlePost.price);
  const [location, setLocation] = useState(singlePost.location);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const post = {
      title: title,
      description: description,
      location: location,
      price: price,
    };
    modifyPost(token, post, singlePost._id);
    setModPostFlag(false);
  };
  return (
    <div className="box">
      <h1>Modify Post</h1>
      <form onSubmit={handleSubmit} className="box form">
        <h2>Title</h2>
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
        <h2>Description</h2>
        <input
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></input>
        <h2>Location</h2>
        <input
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        ></input>
        <h2>Price</h2>
        <input
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        ></input>
        <button className="button" type="submit">
          Update Post
        </button>
      </form>
      <button
        className="button"
        onClick={() => {
          setModPostFlag(false);
        }}
      >
        Cancel Modifyinng Post
      </button>
    </div>
  );
};

export default ModPost;
