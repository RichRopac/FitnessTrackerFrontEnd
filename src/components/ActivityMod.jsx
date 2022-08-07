import React, { useState } from "react";
import { render } from "react-dom";
import { modifyActivity } from "../api";

const ActivityMod = (props) => {
  const { singleActivity, setModActivityFlag } = props;
  const [name, setName] = useState(singleActivity.name);
  const [description, setDescription] = useState(singleActivity.description);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const activity = {
      name: name,
      description: description,

    };
    modifyActivity(token, activity, singleActivity._id);
    setModActivityFlag(false);
  };
  console.log("YOU ARE NOW IN THE ACTIVITY MOD");
  return (
    <div className="box">
      <h1>Modify Activity</h1>
      <form onSubmit={handleSubmit} className="box form">
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
        Update Activity
      </button>
    </form>
    <button
      className="button"
      onClick={() => {
        setModActivityFlag(false);
      }}
    >
      Cancel Modifying Post
    </button>
  </div>
);
};

export default ActivityMod;
