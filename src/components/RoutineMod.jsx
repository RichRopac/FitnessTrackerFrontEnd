import React, { useState } from "react";
import { render } from "react-dom";
const RoutineMod = (props) => {
  const { routine, setUpdateRoutineFlag } = props;
  const [name, setName] = useState(routine.name);
  const [goal, setGoal] = useState(routine.goal);
  const [activityCount, setActivityCount] = useState(0);
  const [activityDuration, setActivityDuration] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const _routine = {
      name: name,
      goal: goal,
      isPublic: isPublic,
    };
    modifyRoutine(token, _routine, routine.id);
    setUpdateRoutineFlag(false);
  };
  return (
    <div className="box">
      <h1>Modify Routine</h1>
      <form
        onSubmit={handleSubmit}
        className="card"
        key={`my-posts-${routine.id}`}
      >
        <h2>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* <u>Routine Name:</u> {routine.name} */}
        </h2>
        <h3>
          <input
            name="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          {/* <u>Goal:</u> {routine.goal} */}
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
                    <input
                      name="duration"
                      value={activityDuration}
                      onChange={(e) => setActivityDuration(e.target.value)}
                    />
                    <br />
                    <input
                      name="count"
                      value={activityCount}
                      onChange={(e) => setActivityCount(e.target.value)}
                    />
                    {/* Count: {count} */}
                  </span>
                </li>
              );
            })}
          </ul>
        </h2>

        <button className="button" type="submit">
          Update Routine
        </button>
      </form>
      <button
        className="button"
        onClick={() => {
          setUpdateRoutineFlag(false);
        }}
      >
        Cancel Modifying Routine
      </button>
    </div>
  );
};
export default RoutineMod;
