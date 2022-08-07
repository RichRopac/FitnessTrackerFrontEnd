import React, { useState } from "react";
import { render } from "react-dom";
const RoutineMod = (props) => {
  const { singleRoutine, setModRoutineFlag } = props;
  const [name, setName] = useState(singleRoutine.name);
  const [goal, setGoal] = useState(singleRoutine.goal);
  const [isPublic, setIsPublic] = useState(singleRoutine.isPublic);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const post = {
      name: name,
      goal: goal,
      isPublic: isPublic,
    };
    modifyRoutine(token, singleRoutine, singleRoutine.id);
    setModRoutineFlag(false);
  };
  return (
    <div className="box">
      <h1>Modify Routine</h1>
      <form onSubmit={handleSubmit} className="box form">
        <h2>Name</h2>
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <h2>Goal</h2>
        <input
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></input>
        <h2>Public</h2>
        <input
          value={isPublic}
          onChange={(event) => {
            setIsPublic(event.target.value);
          }}
        ></input>

        <button className="button" type="submit">
          Update Routine
        </button>
      </form>
      <button
        className="button"
        onClick={() => {
          setModRoutineFlag(false);
        }}
      >
        Cancel Modifying Routine
      </button>
    </div>
  );
};
export default RoutineMod;
