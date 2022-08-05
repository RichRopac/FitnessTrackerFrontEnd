import React, { useState, useEffect } from "react";
import { getProfile, deletePost, getAllRoutines } from "../api";
import "./Profile.css";

const Routines = (props) => {
  const [Routine, setRoutine] = useState([])
  console.log("START OF ROUTINES")
  const token = localStorage.getItem("token");
  const fetchRoutines = async() => {
    setRoutine(await getAllRoutines());  
  }
  useEffect(() => {
    fetchRoutines()
  },[]);
  
  console.log ("THESE ARE THE ROUTINES: ". Routine)

  const displayPublicRoutines = Routine.length ? (
     <div className="">
       {Routine.map((theRoutines) => {
         return (
           <form className="card" key={`my-posts-${theRoutines.id}`}>
             <p className="count">
               ** Routine Number: {Routine.indexOf(theRoutines) + 1} **
             </p>
             <h2>
               <u>ID:</u> {theRoutines.id}
             </h2>
             <h3>
               <u>Creator ID:</u> {theRoutines.creatorID}
             </h3>
             <h3>
               <u>Routine Name:</u> {theRoutines.name}
             </h3>
            
        { token !== null && (
          <>
             <button
               className="button"
              
               onClick={(event) => {
                 event.preventDefault();
            
           
               }}
             >
               Modify This Routine{" "}
             </button>
             <button
               className="button"
         
             
             >
               Delete This Routine
             </button>
            </>
        )}
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
