import React, { useState, useEffect } from "react";
import { getProfile, deletePost, getAllRoutinesByUser } from "../api";
// import { ModPost } from "./";
import "./Profile.css";

const myPosts = (props) => {
  const [profile, setProfile] = useState(null);
  const [modPostFlag, setModPostFlag] = useState(false);
  const [loading, setLoading] = useState(true);
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
    async function fetchProfile() {
    
        const profile = await getProfile(token, post);
        setProfile(profile);
        setLoading(false);         
    }

    fetchProfile();
  }, []);
  
  useEffect(() => { 
    if(profile?.username) {                    // Check to make sure profile is truthy

      async function fetchProfile() {
        
        const routine = await getAllRoutinesByUser(profile.username);
        console.log("ROUTINES: ", routine)
        // setProfile(profile);
        // setLoading(false);         
      }
      
      fetchProfile();
    }
  }, [profile?.username]);  //Everytime Profile ID Changes, Re-run this block of code

 

  return loading ? <div>Contents are loading....</div>:(
    <div className="card-row card">
      <h1 className="user-posts">{`ID: ${profile.id} / ${profile.username}'s Routines`}</h1>
      {modPostFlag ? (
        <ModPost singlePost={singlePost} setModPostFlag={setModPostFlag} />
      ) : (
        <>
         
        </>
      )}
    </div>
  );
};

export default myPosts;
