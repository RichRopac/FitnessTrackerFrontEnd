import React, { useState, useEffect } from "react";
import { getProfile, deletePost, getAllActivities } from "../api";
import { useNavigate } from "react-router-dom";
import { UpdateActivity } from "./"

const Activities = (props) => {
  const [Activity, setActivity] = useState([])
  const [UpdateActivity, setUpdateActivity] = useState(false)
  console.log("START OF ACTIVITIES")
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

  console.log ("THESE ARE THE ACTIVITIES: ", Activity)
  const displayPublicActivity = Activity.length ? (
    <div className="">
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
           
       { token !== null && (
         <>
            <button
              className="button"
             
              onClick={(event) => {
                event.preventDefault();
                // setUpdateActivity(true);
                // handleMessage(event);
                navigate(`/Activities/${theActivity.id}/update`);
                
          
              }}
            >
              Modify This Activity{" "}
            </button>
            <button
              className="button"
        
            
            >
              Delete This Activity
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