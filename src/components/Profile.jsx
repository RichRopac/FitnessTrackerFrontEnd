import React, { useState, useEffect } from "react";
import {
  getProfile,
  getAllRoutinesByUser,
  postNewRoutine,
  postNewActivity,
} from "../api";
// import { ModPost } from "./";
import "./Profile.css";
import { RoutineDisplay } from "./RoutineDisplay";

const myPosts = (props) => {
  const [profile, setProfile] = useState(null);
  const [activity, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRoutine, setShowRoutine] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [name, setName] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [nameA, setNameA] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const token = localStorage.getItem("token");
  const post = [];
  const { setSinglePost, setMessageFlag, singlePost } = props;

  const handleDelete = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    deletePost(token, event.target.id);
  };

  const handleSubmitRoutine = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    console.log("THE DATA GOING IN: ", { name, goal, isPublic });
    postNewRoutine(token, { name, goal, isPublic });
    setShowRoutine(false);
  };

  const handleSubmitActivity = async (event) => {
    try{
    event.preventDefault();
    const token = localStorage.getItem("token");
    postNewActivity(token, { name, description });
    setShowActivity(false);}
    catch (error){
    setErrMessage("Activity by this name already exists, please choose a different name.")
    }
  };

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

      <button className="createButton" onClick={() => setShowRoutine(true)}>
        Create a Routine
      </button>
      <button className="createButton" onClick={() => setShowActivity(true)}>
        Create an Activity
      </button>
      <p className="errorMessage">{errMessage}</p>

      {showRoutine ? (
        <div className="">
          <h1>Create New Routine</h1>
          <form className="box form" onSubmit={handleSubmitRoutine}>
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
            <button className="button" type="submit" value="Routine">
              Submit
            </button>
          </form>
          <button
            className="button"
            onClick={() => {
              setShowRoutine(false);
            }}
          >
            Cancel New Routine
          </button>
        </div>
      ) : null}

      {showActivity ? (
        <div className="">
          <h1>Create New Activity</h1>
          <form className="box form" onSubmit={handleSubmitActivity}>
            <h2>Name</h2>
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
            <h2>Description</h2>
            <input
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></input>

            <button className="button" type="submit">
              Submit
            </button>
          </form>
          <button
            className="button"
            onClick={() => {
              setShowActivity(false);
            }}
          >
            Cancel New Activity
          </button>
        </div>
      ) : null}

      {routines.map((routine, index) => (
        <RoutineDisplay
          routineIndex={routines.indexOf(routine)}
          routine={routine}
          isUserLoggedIn={!!localStorage.getItem("token")}
        />
      ))}
    </div>
  );
};

export default myPosts;
