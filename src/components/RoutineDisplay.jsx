import React, { useState } from "react";
import { RoutineMod } from "./";

export const RoutineDisplay = (props) => {
  const { routineIndex, routine, isUserLoggedIn } = props;
  // console.log("routine", routine);

  const [updateRoutineFlag, setUpdateRoutineFlag] = useState(false);

  return (
    <div>
      {updateRoutineFlag ? (
        <RoutineMod 
          routine={routine}
          setUpdateRoutineFlag={setUpdateRoutineFlag}
        />
      ) : (
        <form className="card" key={`my-posts-${routine.id}`}>
          <p className="count">** Routine Number: {routineIndex + 1} **</p>
          <h2>
            <u>Routine Name:</u> {routine.name}
          </h2>
          <h3>
            <u>Goal:</u> {routine.goal}
          </h3>
          <h3>
            <u>Creator:</u> {routine.creatorName}
          </h3>
          <h2>
            <u>Activity:</u>
            <ul style={{ listStyle: "none" }}>
              {routine.activities.map((activity, index) => {
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
                  setUpdateRoutineFlag(true);
                }}
              >
                Modify This Routine{" "}
              </button>

              <button className="button">Delete This Routine</button>
            </>
          ) : null}
        </form>
      )}
    </div>
  );
};
