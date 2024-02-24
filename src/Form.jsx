import { axios } from "axios";
import { API_URL } from "../api/utils";
import { fetchPosts } from "../api/post";

function Form({ posts, onSubmitHandler, changeHandler, setPosts }) {
  const fetchPosts = fetchPosts();
  const onSubmitHandler = async ({ fetchedTasks }) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, {
        id: posts.id,
        title: posts.title,
        body: posts.body,
      });
      await fetchPosts();
    } catch (error) {
      console.error(error);
    }
    setPosts({ title: "", body: "" });
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="underline">Enter Your Blog Post</h1>
      <form
        action="submit"
        className="flex flex-col items-center"
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
      >
        <input
          onChange={(event) => {
            changeHandler("title", event.target.value);
          }}
          value={posts.title}
          name="title"
          className="border rounded-md px-2 text-top mt-4 h-10"
          placeholder="Enter your blog title here..."
        />
        <textarea
          onChange={(event) => changeHandler("body", event.target.value)}
          value={posts.body}
          name="body"
          className="h-60 w-96 border rounded-md px-2 text-top mt-4"
          placeholder="Enter your blog post here..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
