import React, { useState, useEffect } from "react";
import { getProfile, deletePost, getAllRoutines } from "../api";
import "./Profile.css";
import { RoutineDisplay } from "./RoutineDisplay";

const Routines = (props) => {
  const [routines, setRoutines] = useState([]);
  const isUserLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  const fetchRoutines = async () => {
    setRoutines(await getAllRoutines());
  };
  useEffect(() => {
    fetchRoutines();
  }, []);
  console.log("routines?", routines);

  const displayPublicRoutines = routines.length ? (
    <div className="">
      {routines.map((routine) => {
        console.log("routine in activites", routine);
        return (
          <RoutineDisplay
            routineIndex={routines.indexOf(routine)}
            routine={routine}
            isUserLoggedIn={isUserLoggedIn()}
          />
        );
      })}
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
