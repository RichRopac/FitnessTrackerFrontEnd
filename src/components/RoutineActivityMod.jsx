import React, { useState } from "react";
import { modifyActivityOfRoutine } from "../api";

const RoutineActivityMod = (props) => {
  const { activity } = props;
  const [count, setCount] = useState(activity.count);
  const [duration, setDuration] = useState(activity.duration);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const activityToUpdate = {
      count,
      duration,
    };
    const updatedActivity = await modifyActivityOfRoutine(
      token,
      activityToUpdate,
      activity.routineActivityId
    );

    // Update the activity within the activity array

    // const activities = activity.map(theActivity => {
    //   if (theActivity.id === updatedActivity.id) {
    //     return updatedActivity;
    //   }  else {
    //     return theActivity;
    //   }
    // })
    // setActivity(activities);
    // setUpdateActivityFlag(false);
  };
  console.log("YOU ARE NOW IN THE ACTIVITY MOD");
  return (
    <div className="box">
      <h1>Modify Activity</h1>
      <form onSubmit={handleSubmit} className="box form">
        <h2>Count</h2>
        <input
          value={count}
          onChange={(event) => {
            setCount(event.target.value);
          }}
        ></input>
        <h2>Duration</h2>
        <input
          value={duration}
          onChange={(event) => {
            setDuration(event.target.value);
          }}
        ></input>

        <button className="button" type="submit">
          Update Activity
        </button>
      </form>
    </div>
  );
};

export default RoutineActivityMod;
