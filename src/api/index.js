import axios from "axios";
const API_URL = "http://fitnesstrac-kr.herokuapp.com/api";

// Routines
export const getAllRoutines = async () => {
  const response = await (await fetch(`${API_URL}/routines`)).json();
  console.log("response");
  return response;
};

export const getAllRoutinesByUser = async (userId) => {
  const response = await (
    await fetch(`${API_URL}/users/${userId}/routines`)
  ).json();
  console.log("response");
  return response;
};

export const postNewRoutine = async (token, routine) => {
  console.log("ROUTINESDIN: ", routine);
  const response = await fetch(`${API_URL}/routines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(routine),
  });
  const result = await response.json();
  const newRoutine = result;
  return newRoutine;
};

export const modifyRoutine = async (token, routine, routineId) => {
  const response = await fetch(`${API_URL}/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: routine.name,
      goal: routine.goal,
    }),
  });
  const result = await response.json();
  console.log(result);
  return result;
};

export const postNewActivityToRoutine = async (
  token,
  newActivity,
  routineId
) => {
  const response = await fetch(`${API_URL}/routines/${routineId}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newActivity),
  });
  const result = await response.json();
  const _newActivity = result;
  return _newActivity;
};

export const deleteActivityFromRoutine = async (token, routineActivityId) => {
  const response = await fetch(
    `${API_URL}/routine_activities/${routineActivityId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result = await response.json();
  console.log(result);
};

export const modifyActivityOfRoutine = async (
  token,
  activity,
  routineActivityId
) => {
  console.log("THIS IS THE API INDEXJS RESULT", activity);
  const response = await fetch(
    `${API_URL}/routine_activities/${routineActivityId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(activity),
    }
  );
  const result = await response.json();
  console.log("THIS IS THE API INDEXJS RESULT", result);
  return result;
};

export const deleteRoutine = async (token, routineId) => {
  const response = await fetch(`${API_URL}/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  console.log(result);
};

// Activities
export const postNewActivity = async (token, activity) => {
  const response = await fetch(`${API_URL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(activity),
  });
  const result = await response.json();
  const newActivity = result;
  return newActivity;
};
export const getAllActivities = async () => {
  const response = await (await fetch(`${API_URL}/activities`)).json();
  console.log("response");
  return response;
};

export const modifyActivity = async (token, activity, activityId) => {
  console.log("THIS IS THE API INDEXJS RESULT", activity);
  const response = await fetch(`${API_URL}/activities/${activityId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: activity.name,
      description: activity.description,
    }),
  });
  const result = await response.json();
  console.log("THIS IS THE API INDEXJS RESULT", result);
  return result;
};

// users
export const userRegistration = async (username, password) => {
  console.log("User and Password", username, password);
  console.log(`${API_URL}/users/register`);
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const result = await response.json();
  console.log("THIS IS THE RESULT FROM API INDEX.JS: ", result);
  return result;
};

export const userLogin = async (username, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  const result = await response.json();
  return result;
};

// profile
export const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
