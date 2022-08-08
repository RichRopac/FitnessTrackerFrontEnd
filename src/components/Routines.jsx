import React, { useState, useEffect } from "react";
import { getProfile, deletePost, getAllRoutines } from "../api";
import "./Profile.css";
import { RoutineDisplay } from "./RoutineDisplay";
import "./Routines.css";

const Routines = (props) => {
  const {user} = props;
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
       
        return (
          <RoutineDisplay
            key={routine.id}
            routineIndex={routines.indexOf(routine)}
            routine={routine}
            routines={routines}
            setRoutines={setRoutines}
            isUserLoggedIn={isUserLoggedIn()}
            user={user}
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
