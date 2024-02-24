import { useState, useEffect } from "react";
import Form from "./Form";
import "./index.css";
import Output from "./Output";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { API_URL } from "../api/utils";

function App() {
  const [posts, setPosts] = useState({ body: "", title: "" });
  const [outPutPost, setOutputPost] = useState([]);
  const [post, fetchedPost] = useState([]);
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(API_URL);
      fetchedPost(data);
    } catch (error) {
      console.error(error);
    }
    setOutputPost(post);
  };

  useEffect(() => {
    fetchPost();
  });

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchPost();
    } catch (error) {
      console.error(error);
    }
  };

  const changeHandler = (idenitfier, value) => {
    setPosts((prevPost) => {
      return {
        ...prevPost,
        [idenitfier]: value,
      };
    });
  };
  console.log(posts);
  return (
    <>
      <Output outPutPost={outPutPost} />
      <Form setPosts={setPosts} posts={posts} changeHandler={changeHandler} />
    </>
  );
}

export default App;
