import React, { useState, useEffect } from "react";
import { getProfile, deletePost, getAllRoutines } from "../api";
import "./Profile.css";
import { RoutineDisplay } from "./RoutineDisplay";

const Routines = (props) => {
  const [Routine, setRoutine] = useState([]);
  console.log("START OF ROUTINES");
  // const token = localStorage.getItem("token");
  const isUserLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  const fetchRoutines = async () => {
    setRoutine(await getAllRoutines());
  };
  useEffect(() => {
    fetchRoutines();
  }, []);

  console.log("THESE ARE THE ROUTINES: ".Routine);

  const displayPublicRoutines = Routine.length ? (
    <div className="">
      {Routine.map((theRoutines) => (
        <RoutineDisplay
          theRoutines={theRoutines}
          isUserLoggedIn={isUserLoggedIn()}
        />
      ))}
    </div>
  ) : (
    <div>Loading Routines...</div>
  );

  return (
    <div className="card-row card">
      <h1 className="user-posts">{"Public Routines"}</h1>
      <>{displayPublicRoutines}</>
    </div>
  );
};

export default Routines;
