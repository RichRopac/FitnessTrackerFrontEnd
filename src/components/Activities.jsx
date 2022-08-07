import React, { useState, useEffect } from "react";
import { modifyActivities, deletePost, getAllActivities } from "../api";
import { useNavigate } from "react-router-dom";
import { UpdateActivity, ActivityMod } from "./";

const Activities = (props) => {
  const [activity, setActivity] = useState([]);
  const [updateActivity, setUpdateActivity] = useState(false);
  console.log("START OF ACTIVITIES");
  const { setSingleActivity, singleActivity } = props;

  const isUserLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    deleteActivity(event.target.id);
  };
  const handleSubmit = (event) => {
    const singledOutActivity = activity.filter(
      (element) => element.id == event.target.id
    );

    setSingleActivity(singledOutActivity[0]);
    console.log("singledOutActivity: ", singledOutActivity);
  };
  const fetchActivities = async () => {
    setActivity(await getAllActivities());
  };
  useEffect(() => {
    fetchActivities();
  }, []);

  console.log("THESE ARE THE ACTIVITIES: ", activity);
  const displayPublicActivity = activity.length ? (
    <div className="">
      {activity.map((theActivity) => {
        return (
          <form className="card" key={`my-posts-${theActivity.id}`}>
            <p className="count">
              ** Activity Number: {activity.indexOf(theActivity) + 1} **
            </p>
            <h2>
              <u>Activity Name:</u> {theActivity.name}
            </h2>
            <h3>
              <u>Description:</u> {theActivity.description}
            </h3>

            {isUserLoggedIn() && (
              <>
                <button
                  className="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setUpdateActivity(true);
                    handleSubmit(event);
                    ActivityMod()
                  }}
                >
                  Modify This Activity{" "}
                </button>
              </>
            )}
          </form>
        );
      })}
    </div>
  ) : (
    <div>Loading Activity...</div>
  );

  return (
    <div className="card-row card">
      <h1 className="user-posts">{"Public Activities"}</h1>
      <>{displayPublicActivity}</>
    </div>
  );
};

export default Activities;
