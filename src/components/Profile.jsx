import React, { useState, useEffect } from "react";
import { getProfile, deletePost } from "../api";
// import { ModPost } from "./";
import "./Profile.css";

const myPosts = (props) => {
  const [myMessages, setMyMessages] = useState([]);
  const [modPostFlag, setModPostFlag] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const token = localStorage.getItem("token");
  const post = [];
  const { setSinglePost, setMessageFlag, singlePost } = props;

  const handleMessage = (event) => {
    const singledOutPost = myPosts.filter(
      (element) => element._id == event.target.id
    );
    setSinglePost(singledOutPost[0]);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    deletePost(token, event.target.id);
  };

  useEffect(() => {
    async function fetchPosts() {
      if (!myPosts.length) {
        const profile = await getProfile(token, post);
        console.log(profile);
        const activePosts = profile.posts.filter(
          (post) => post.active === true
        );
        const myMessages = profile.messages;
        setMyMessages(myMessages);
        setMyPosts(activePosts);
      }
    }

    fetchPosts();
  }, []);
  console.log(myPosts);

  const displayPosts = myPosts ? (
    <div className="">
      {myPosts.map((post) => {
        return (
          <form className="card" key={`my-posts-${post._id}`}>
            <p className="count">
              ** Post Number: {myPosts.indexOf(post) + 1} **
            </p>
            <h2>
              <u>Title:</u> {post.title}
            </h2>
            <h3>
              <u>Location:</u> {post.location}
            </h3>
            <h3>
              <u>Description:</u> {post.description}
            </h3>
            <h3>
              <u>Price:</u> {post.price}{" "}
            </h3>

            <button
              className="button"
              id={`${post._id}`}
              onClick={(event) => {
                event.preventDefault();
                handleMessage(event);
                setModPostFlag(true);
                handleMessage(event);
              }}
            >
              Modify This Post{" "}
            </button>
            <button
              className="button"
              id={`${post._id}`}
              onClick={handleDelete}
            >
              Delete This Post
            </button>
          </form>
        );
      })}
    </div>
  ) : (
    <div>Loading Posts...</div>
  );

  const displayMessages = myMessages ? (
    <div className="">
      {myMessages.map((message) => {
        return (
          <form className="card" key={`my-message-${message._id}`}>
            <p className="count">
              ** Message Number: {myMessages.indexOf(message) + 1} **
            </p>
            <h2>
              <u>Title:</u> {message.post.title}
            </h2>
            <h3>
              <u>Your Message: </u> {message.content}
            </h3>
          </form>
        );
        {
          count++;
        }
      })}
    </div>
  ) : (
    <div>Loading Posts...</div>
  );

  return (
    <div className="card-row card">
      <h1 className="user-posts">{"My Posts/Messages"}</h1>
      {modPostFlag ? (
        <ModPost singlePost={singlePost} setModPostFlag={setModPostFlag} />
      ) : (
        <>
          {displayPosts}
          {displayMessages}
        </>
      )}
    </div>
  );
};

export default myPosts;
