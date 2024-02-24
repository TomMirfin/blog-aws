const React = require("react");
const { useState, useEffect } = React;
const Form = require("./Form");
require("./index.css");
const Output = require("./Output");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { API_URL } = require("../api/utils");

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
