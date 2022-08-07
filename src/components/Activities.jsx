import React, { useState, useEffect } from "react";
import { modifyActivities, deletePost, getAllActivities } from "../api";
import { useNavigate } from "react-router-dom";
import { UpdateActivity, ActivityMod } from "./";
import "./Routines.css";

const Activities = (props) => {
  const [activity, setActivity] = useState([]);
  const [updateActivityFlag, setUpdateActivityFlag] = useState(false);
  console.log("START OF ACTIVITIES");
  const [singleActivity, setSingleActivity] = useState({});

  const isUserLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    deleteActivity(event.target.id);
  };
  const handleSubmit = (event) => {
    console.log("SHOWING THE EVENT ID: ", event.target.id)
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
                  id={`${theActivity.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    setUpdateActivityFlag(true);
                    handleSubmit(event);
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

  const getContent = () => {
   if (updateActivityFlag) {
      return (
        <ActivityMod activity={activity} setActivity={setActivity} singleActivity={singleActivity} setUpdateActivityFlag={setUpdateActivityFlag} />
      );
    } else{
      return (
        <>{displayPublicActivity}</>
      )
    }
  };



  return (
    <div className="card-row card">
      <h1 className="user-posts">{"Public Activities"}</h1>
      {getContent()}
    </div>
  );
};

export default Activities;
