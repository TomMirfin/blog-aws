import express from "express";
import { fetchPosts, createPost, updatePost, deletePosts } from "./post";
import severless from "serverless-http";
import cors from "cors";
const port = 3001;
const app = express();
app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/blogposts", async (req, res) => {
  try {
    const results = await fetchPosts();
    res.send(results.Items);
  } catch (error) {
    res.status(400).send(`Error fetching blog posts, ${error} `);
  }
});

app.post("/blogposts", async (req, res) => {
  try {
    const post = req.body;
    const response = await createPost(post);
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error creating blog posts, ${error} `);
  }
});

app.put("/blogposts/:id", async (req, res) => {
  try {
    const post = req.body;
    const response = await updatePost(post);
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error creating blog posts, ${error} `);
  }
});

app.delete("/blogposts/:id", (req, res) => {
  try {
    const { id } = req.params;
    const response = deletePosts(id);
  } catch (error) {
    res.status(400).send(`Error deleting blog posts, ${error} `);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = severless(app);
