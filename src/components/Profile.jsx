import React, { useState, useEffect } from "react";
import { getProfile, deletePost, getAllRoutinesByUser, postNewRoutine } from "../api";
// import { ModPost } from "./";
import "./Profile.css";
import { RoutineDisplay } from "./RoutineDisplay";

const myPosts = (props) => {
  const [profile, setProfile] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    postNewRoutine(token, {name,goal,isPublic});
    setShowCreate(false);
  }

  useEffect(() => {
    async function fetchProfile() {
      const profile = await getProfile(token, post);
      setProfile(profile);
      setLoading(false);
    }

    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile?.username) {
      // Check to make sure profile is truthy

      async function fetchProfile() {
        const routine = await getAllRoutinesByUser(profile.username);
        console.log("ROUTINES: ", routine);
        setRoutines(routine);
        // setLoading(false);
      }

      fetchProfile();
    }
  }, [profile?.username]); //Everytime Profile ID Changes, Re-run this block of code

  return loading ? (
    <div>Contents are loading....</div>
  ) : (
    <div className="card-row card">
      <h1 className="user-posts">{`ID: ${profile.id} / ${profile.username}'s Routines`}</h1>
      <button onClick={() => setShowCreate(true)}>Create a Routine</button>
      {showCreate ? (
        <div className="">
          <h1>Create New Routine</h1>
          <form className="box form" onSubmit={handleSubmit}>
            <h2>Name</h2>
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
            <h2>Goal</h2>
            <input
              value={goal}
              onChange={(event) => {
                setGoal(event.target.value);
              }}
            ></input>
            <div className="is-public-container">
            <h2>Public</h2>
            <input
            className="is-public-checkbox"
              checked={isPublic}
              type="checkbox"
              onChange={(event) => {
                setIsPublic(!isPublic);
              }}
            ></input>
            </div>
            <button className="button" type="submit">
              Submit
            </button>
          </form>
          <button
            className="button"
            onClick={() => {
              setShowCreate(false);
            }}
          >
            Cancel New Routine
          </button>
        </div>
      ) : null}
      {routines.map((routine, index) => <RoutineDisplay routineIndex={index} theRoutines={routine} isUserLoggedIn={!!localStorage.getItem("token")}/>)}
    </div>
  );
};

export default myPosts;
