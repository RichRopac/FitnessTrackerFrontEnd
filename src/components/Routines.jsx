import React, { useState, useEffect } from "react";
import { getProfile, deletePost, getAllRoutines } from "../api";
import { ModPost } from ".";
import "./Profile.css";

const routines = (props) => {
  console.log("START OF ROUTINES")
  const [routines, setRoutines] = useState([]);
  const routine = [];
  const { setSingleRoutine, singleRoutine } = props;
  const theRoutines = getAllRoutines();
  console.log("THE ROUTINES: ", theRoutines);
  // useEffect(() => {
  //   async function fetchRoutines() {
  //     if (!routines.length) {
     
  //       const publicRoutine = routines.filter(
  //         (post) => post.active === true
  //       );
  //       const myRoutines = profile.messages;
  //       setMyMessages(myRoutines);
  //       setMyPosts(activePosts);
  //     }
  //   }

  //   fetchRoutines();
  // }, []);
  // console.log(myPosts);

  // const displayPublicRoutines = routines ? (
  //   <div className="">
  //     {routines.map((routine) => {
  //       return (
  //         <form className="card" key={`my-posts-${post._id}`}>
  //           <p className="count">
  //             ** Routine Number: {routines.indexOf(routine) + 1} **
  //           </p>
  //           <h2>
  //             <u>ID:</u> {routine.id}
  //           </h2>
  //           <h3>
  //             <u>Creator ID:</u> {routine.creatorID}
  //           </h3>
  //           <h3>
  //             <u>Routine Name:</u> {routine.name}
  //           </h3>
  //           <h3>
  //             <u>Price:</u> {post.price}{" "}
  //           </h3>

  //           <button
  //             className="button"
  //             id={`${post._id}`}
  //             onClick={(event) => {
  //               event.preventDefault();
            
           
  //             }}
  //           >
  //             Modify This Post{" "}
  //           </button>
  //           <button
  //             className="button"
         
             
  //           >
  //             Delete This Post
  //           </button>
  //         </form>
  //       );
  //     })}
  //   </div>
  // ) : (
  //   <div>Loading Routines...</div>
  // );

  

  // return (
  //   <div className="card-row card">
  //     <h1 className="user-posts">{"Public Routines"}</h1>
  //     {modPostFlag ? (
  //       <ModPost singlePost={singlePost} setModPostFlag={setModPostFlag} />
  //     ) : (
  //       <>
  //         {displayRoutines}
         
  //       </>
  //     )}
  //   </div>
  // );
};

export default routines;
