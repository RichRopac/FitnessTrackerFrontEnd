import React from "react";
import {RoutineMod} from "./";

export const RoutineDisplay = (props) => {
  const {routineIndex, theRoutines, isUserLoggedIn} = props;
  return (
    <form className="card" key={`my-posts-${theRoutines.id}`}>
      <p className="count">
        ** Routine Number: {routineIndex + 1} **
      </p>
      <h2>
        <u>Routine Name:</u> {theRoutines.name}
      </h2>
      <h3>
        <u>Goal:</u> {theRoutines.goal}
      </h3>
      <h3>
        <u>Creator:</u> {theRoutines.creatorName}
      </h3>
      <h2>
        <u>Activity:</u>
        <ul style={{ listStyle: "none" }}>
          {theRoutines.activities.map((activity, index) => {
            const {
              id,
              routineActivityId,
              name,
              description,
              duration,
              count,
            } = activity;
            return (
              <li 
                key={`${id}${routineActivityId}`}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    alignSelf: "center",
                    marginRight: "10px",
                    width: "20px",
                    justifySelf: "center",
                  }}
                >
                  {index + 1}
                </span>
                <span style={{ width: "350px" }}>
                  Name: {name}
                  <br />
                  Description: {description}
                  <br />
                  Duration: {duration}
                  <br />
                  Count: {count}
                </span>
              </li>
            );
          })}
        </ul>
      </h2>

      {isUserLoggedIn ? (
        <>
          <button
            className="button"
            id={`${routineIndex}`}
            onClick={(event) => {
              event.preventDefault();
              
            }}
          >
            Modify This Routine{" "}
          </button>

          <button className="button">Delete This Routine</button>
        </>
      ) : null}
    </form>
  );
};
