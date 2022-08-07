import React, { useState, useEffect } from "react";
import { getProfile, deletePost, getAllRoutines } from "../api";
import "./Profile.css";
import { RoutineDisplay } from "./RoutineDisplay";

const Routines = (props) => {
  const [Routine, setRoutine] = useState([]);
  const isUserLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  const fetchRoutines = async () => {
    setRoutine(await getAllRoutines());
  };
  useEffect(() => {
    fetchRoutines();
  }, []);


  const displayPublicRoutines = Routine.length ? (
    <div className="">
      {Routine.map((theRoutines) => (
        <RoutineDisplay
          routineIndex={Routine.indexOf(theRoutines)}
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
