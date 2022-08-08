import React, { useState, useEffect } from "react";
import {
  modifyRoutine,
  getAllActivities,
  postNewActivityToRoutine,
  deleteActivityFromRoutine,
} from "../api";
import RoutineActivityMod from "./RoutineActivityMod";

const RoutineMod = (props) => {
  const { routine, setUpdateRoutineFlag, routines, setRoutines } = props;
  const [name, setName] = useState(routine.name);
  const [goal, setGoal] = useState(routine.goal);
  const [activityCount, setActivityCount] = useState(0);
  const [activityDuration, setActivityDuration] = useState(0);
  const [newActivityCount, setNewActivityCount] = useState(0);
  const [newActivityDuration, setNewActivityDuration] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState({});
  const [newActivityId, setNewActivityId] = useState(null);
  const [activities, setActivities] = useState([]);
  const token = localStorage.getItem("token");
  const fetchActivities = async () => {
    setActivities(await getAllActivities());
  };
  useEffect(() => {
    fetchActivities();
  }, []);

  const deleteActivity = async (routineActivityId) => {
    await deleteActivityFromRoutine(token, routineActivityId); //Backend
    //Frontend
    const updatedRoutines = routines.map((_routine) => {
      if (_routine.id === routine.id) {
        return {
          ..._routine,
          activities: _routine.activities.filter((activity) => {
            return activity.routineActivityId !== routineActivityId;
          }),
        };
      } else {
        return _routine;
      }
    });
    setRoutines(updatedRoutines);
  };

  const addActivityToRoutine = async () => {
    // Count, Duration, RoutineId, activityId
    // Backend
    const newActivity = await postNewActivityToRoutine(
      token,
      {
        activityId: newActivityId,
        count: newActivityCount,
        duration: newActivityDuration,
      },
      routine.id
    );
    // Frontend
    const _activity = activities.find(
      (activity) => activity.id === newActivity.activityId
    );
    const updatedRoutines = routines.map((_routine) => {
      if (_routine.id === routine.id) {
        return {
          ..._routine,
          activities: [
            ...routine.activities,
            {
              ...newActivity,
              name: _activity.name,
              description: _activity.description,
            },
          ],
        };
      } else {
        return _routine;
      }
    });
    setRoutines(updatedRoutines);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const _routine = {
      name: name,
      goal: goal,
    };
    const modifiedRoutine = await modifyRoutine(token, _routine, routine.id);
    const updatedRoutines = routines.map((_routine) => {
      if (_routine.id === modifiedRoutine.id) {
        return {
          ..._routine,
          name: modifiedRoutine.name,
          goal: modifiedRoutine.goal,
        };
      } else {
        return _routine;
      }
    });
    setRoutines(updatedRoutines);
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
            onChange={(event) => setName(event.target.value)}
          />
          {/* <u>Routine Name:</u> {routine.name} */}
        </h2>
        <h3>
          <input
            name="goal"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
          />
          {/* <u>Goal:</u> {routine.goal} */}
        </h3>
        <button className="button" type="submit">
          Update Routine
        </button>
      </form>
      <h2>
        <form>
          <input
            name="newActivityCount"
            placeholder="Add Amount of Reps"
            onChange={(event) => setNewActivityCount(event.target.value)}
          />
          <input
            name="newActivityDuration"
            placeholder="Add amount of time"
            onChange={(event) => setNewActivityDuration(event.target.value)}
          />
          <select
            defaultValue=""
            onChange={(event) => setNewActivityId(event.target.value)}
          >
            <option value="" disabled>
              Select an activity
            </option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
          <button
            className="button"
            type="button"
            onClick={addActivityToRoutine}
          >
            Add Activity
          </button>
        </form>

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
                  Count: {count}
                  <br />
                  Duration: {duration}
                </span>
                <button
                  type="button"
                  className="button"
                  onClick={() => deleteActivity(routineActivityId)}
                >
                  Delete Activity
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => setSelectedActivity(activity)}
                >
                  Update Activity
                </button>
                {selectedActivity.id === activity.id ? (
                  <RoutineActivityMod activity={selectedActivity} />
                ) : null}
              </li>
            );
          })}
        </ul>
      </h2>

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
