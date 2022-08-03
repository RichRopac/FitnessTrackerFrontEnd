import React, { useState } from "react";
import { postNew } from "../api";
const NewPost = (props) => {
  const { setNewPostFlag, allPosts, setAllPosts } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("free");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const newPost = {
      title: title,
      description: description,
      location: location,
      price: price,
    };
    const freshPost = await postNew(token, newPost);
    setAllPosts([...allPosts, freshPost]);
    setNewPostFlag(false);
  };
  return (
    <div className="">
      <h1>Create New Post</h1>
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
          Submit
        </button>
      </form>
      <button
        className="button"
        onClick={() => {
          setNewPostFlag(false);
        }}
      >
        Cancel New Post
      </button>
    </div>
  );
};

export default NewPost;
