

      import axios from "axios";
      const API_URL = "http://fitnesstrac-kr.herokuapp.com/api";
      // const API_URL = "https://localhost:3005/api";
      
      export const getAllRoutines = async () => {
        const response = await fetch(`${API_URL}/routines`);
        const result = await response.json();
        const data = result.data.routine;
        console.log("result");
        return result;
      };
      
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
        console.log("THIS IS THE RESULT FROM API INDEX.JS: ", result)
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
      
      export const getProfile = async (token) => {
        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = await response.json();
        return data;
      };
      
      export const postNew = async (token, post) => {
        const response = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            post: post,
          }),
        });
        const result = await response.json();
        const newPost = result.data.post;
        return newPost;
      };
      
      export const postMessage = async (token, postID, payload) => {
        const response = await fetch(`${API_URL}/posts/${postID}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: {
              content: `${payload.content}`,
            },
          }),
        });
        const result = await response.json();
        console.log(result, "posted message after API");
        return result;
      };
      
      export const modifyPost = async (token, post, postID) => {
        const response = await fetch(`${API_URL}/posts/${postID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            post: post,
          }),
        });
        const result = await response.json();
        console.log(result);
      };
      
      export const deletePost = async (token, postID) => {
        const response = await fetch(`${API_URL}/posts/${postID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        console.log(result);
      };
      

