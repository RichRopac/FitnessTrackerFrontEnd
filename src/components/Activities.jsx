import React, { useState, useEffect } from "react";
import { getProfile, deletePost, getAllActivities, postNewActivity } from "../api";
import { useNavigate } from "react-router-dom";
import { UpdateActivity } from "./"

const Activities = (props) => {
  const [Activity, setActivity] = useState([])
  const [UpdateActivity, setUpdateActivity] = useState(false)
  console.log("START OF ACTIVITIES")
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const { setSingleActivity, singleActivity } = props
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
//   const handleMessage = (event) => {
//     const singledOutActivity = Activity.filter(
//       (element) => element._id == event.target.id
//     );
//     setSingleActivity(singledOutActivity[0]);
//     console.log("singledOutActivity: ", singledOutActivity);
// };
  const fetchActivities = async() => {
    setActivity(await getAllActivities());  
  }
  useEffect(() => {
    fetchActivities()
  },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    postNewActivity(token, activityName, description);
    setShowCreate(false);
  }

  console.log ("THESE ARE THE ACTIVITIES: ", Activity)
  const displayPublicActivity = Activity.length ? (
    <div className="">
        <button onClick={() => setShowCreate(true)}>Create a Activity</button>
      {showCreate ? (
        <div className="">
          <h1>Create New Activity</h1>
          <form className="box form" onSubmit={handleSubmit}>
            <h2>Activity Name</h2>
            <input
              value={activityName}
              onChange={(event) => {
                setActivityName(event.target.value);
              }}
            ></input>
            <h2>Description</h2>
            <input
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></input>
            <button className="button" type="submit">
              Submit
            </button>
          </form>
          <button
            className="button"
            onClick={() => {
              setShowCreate(false);
            }}
          >
            Cancel New Routine
          </button>
        </div>
        ) : null}
      {Activity.map((theActivity) => {
        return (
          <form className="card" key={`my-posts-${theActivity.id}`}>
            <p className="count">
              ** Activity Number: {Activity.indexOf(theActivity) + 1} **
            </p>
            <h2>
              <u>Activity Name:</u> {theActivity.name}
            </h2>
            <h3>
              <u>Description:</u> {theActivity.description}
            </h3>
          </form>
        );
      })}
    </div>
  ) : (
    <div>Loading Activity...</div>
  );
  
    // if(UpdateActivity){
    //   <UpdateActivity singleActivity={singleActivity}  setUpdateActivity={setUpdateActivity} />
    // }


  return (
    <div className="card-row card">
      <h1 className="user-posts">{"Public Activities"}</h1>
      
        <>
        
          {displayPublicActivity}
        
        </>
     
    </div>
  );
};

 




export default Activities;