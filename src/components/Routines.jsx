import React, { useState, useEffect } from "react";
import { getProfile, deletePost, getAllRoutines } from "../api";
import "./Profile.css";

const Routines = (props) => {
  console.log("START OF ROUTINES")
  
  const theRoutines = getAllRoutines();
  console.log ("THESE ARE THE ROUTINES: ". theRoutines)

  const displayPublicRoutines = theRoutines ? (
     <div className="">
       {Routines.map((theRoutines) => {
         return (
           <form className="card" key={`my-posts-${routine._id}`}>
             <p className="count">
               ** Routine Number: {theRoutines.indexOf(routine) + 1} **
             </p>
             <h2>
               <u>ID:</u> {routine.id}
             </h2>
             <h3>
               <u>Creator ID:</u> {routine.creatorID}
             </h3>
             <h3>
               <u>Routine Name:</u> {routine.name}
             </h3>
             <h3>
               <u>Price:</u> {post.price}{" "}
             </h3>

             <button
               className="button"
               id={`${post._id}`}
               onClick={(event) => {
                 event.preventDefault();
            
           
               }}
             >
               Modify This Post{" "}
             </button>
             <button
               className="button"
         
             
             >
               Delete This Post
             </button>
           </form>
         );
       })}
     </div>
   ) : (
     <div>Loading Routines...</div>
   );


   return (
     <div className="card-row card">
       <h1 className="user-posts">{"Public Routines"}</h1>
         <>
           {displayPublicRoutines}
         
         </>
      
     </div>
   );
};

export default Routines;
