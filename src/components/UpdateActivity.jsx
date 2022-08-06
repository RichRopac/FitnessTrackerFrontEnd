import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { modifyActivities } from '../api';

const UpdateActivity = (props) => {

    const dataActivity = useLocation()
    const activityInfo = dataActivity.state
    console.log("dataActivity: ", dataActivity)
//   const [name, setName] = useState(activityInfo.name);
//   const [description, setDescription] = useState(activityInfo.description);
//   const navigate = useNavigate();

//   const params = useParams();

//   const token = getCurrentData('token');

//   const updateOptions = {
//     id: params.id,
//     name: name,
//     description: description,
//   };
    return ( <h1>Update Activity</h1> );
}
 
export default UpdateActivity;