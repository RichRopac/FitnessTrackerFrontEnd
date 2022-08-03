import React, { useEffect, useState } from "react";
import { NewPost, ModPost, MessageOwner } from "./";
import { getAllPosts, deletePost, getProfile } from "../api";
import "./Posts.css";
const Posts = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [newPostFlag, setNewPostFlag] = useState(false);
  const [modPostFlag, setModPostFlag] = useState(false);
  const [messageOwnerFlag, setMessageOwnerFlag] = useState(false);
  const { setSinglePost, setMessageFlag, singlePost } = props;
  const [allPosts, setAllPosts] = useState([]);
  const [myProfile, setMyProfile] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);
  console.log("All Post", allPosts);
  const handleMessage = (event) => {
    const singledOutPost = allPosts.filter(
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
    setFilteredPosts(
      allPosts.filter(
        (post) =>
          post.title.includes(searchValue) ||
          post.price.includes(searchValue) ||
          post.location.includes(searchValue) ||
          post.description.includes(searchValue) ||
          post.author.username.includes(searchValue)
      )
    );
  }, [searchValue, allPosts]);
  useEffect(() => {
    async function fetchPosts() {
      if (!allPosts.length) {
        const retrievedPosts = await getAllPosts();
        setAllPosts(retrievedPosts);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("token");
      const retrievedProfile = await getProfile(token);
      setMyProfile(retrievedProfile);
    }

    fetchProfile();
  }, []);

  const displayPosts = filteredPosts.length ? (
    <div className="">
      {filteredPosts.map((post) => {
        return (
          <form className="card" key={`all-posts-${post._id}`}>
            <h2>
              <u>Title:</u> {post.title}
            </h2>
            <h3>
              <u>Author:</u> {post.author.username}
            </h3>
            <h3>
              <u>Location:</u> {post.location}
            </h3>
            <h3>
              <u>Description:</u> {post.description}
            </h3>
            <h3>
              <u>Price:</u> {post.price}{" "}
            </h3>
            {post.author._id !== myProfile._id && (
              <button
                className="button"
                id={`${post._id}`}
                onClick={(event) => {
                  event.preventDefault();
                  setMessageFlag(true);
                  handleMessage(event);
                  setMessageOwnerFlag(true);
                }}
              >
                Message Owner
              </button>
            )}
            {post.author._id === myProfile._id && (
              <>
                <button
                  className="button"
                  id={`${post._id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    setModPostFlag(true);
                    handleMessage(event);
                  }}
                >
                  Modify My Post{" "}
                </button>
                <button
                  className="button"
                  id={`${post._id}`}
                  onClick={handleDelete}
                >
                  Delete My Post
                </button>
              </>
            )}
          </form>
        );
      })}
    </div>
  ) : (
    <div>Loading Posts...</div>
  );

  const getContent = () => {
    if (messageOwnerFlag) {
      return (
        <MessageOwner
          setMessageOwnerFlag={setMessageOwnerFlag}
          singlePost={singlePost}
        />
      );
    } else if (newPostFlag) {
      return (
        <NewPost
          setNewPostFlag={setNewPostFlag}
          setAllPosts={setAllPosts}
          allPosts={allPosts}
        />
      );
    } else if (modPostFlag) {
      return (
        <ModPost singlePost={singlePost} setModPostFlag={setModPostFlag} />
      );
    } else {
      return (
        <>
          <input
            className="search"
            placeholder="Search All Posts for Specific Text"
            onChange={(event) => setSearchValue(event.target.value)}
            value={searchValue}
          ></input>
          <button
            className="createButton"
            onClick={() => {
              setNewPostFlag(true);
            }}
          >
            Create New Post
          </button>

          {displayPosts}
        </>
      );
    }
  };

  return (
    <div className="card-row card">
      <h1 className="user-posts">{"All Users' Posts"}</h1>

      {getContent()}
    </div>
  );
};

export default Posts;
