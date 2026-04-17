const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
let posts = [
    {
        id: '1a',
        username: "sajjad Dotani",
        content: "Sajjad Dotani is a software engineer with expertise in web development and machine learning. He has a passion for creating innovative solutions and is always eager to learn new technologies."

    },
    {
        id: '2b',
        username: "John Doe",
        content: "John Doe is a fictional character often used as a placeholder name in legal proceedings and discussions. The name is commonly used to refer to an anonymous or unidentified person."
    },
    {
        id: '3c',
        username: "Jane Smith",
        content: "Jane Smith is a renowned author known for her captivating novels and insightful essays. Her works often explore themes of identity, love, and human nature, earning her critical acclaim and a dedicated readership."
    }
]


app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});
app.get("/posts", (req, res) => {
    res.render("posts.ejs");
})
app.get("/posts/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});
app.post("/new/posts", (req, res) => {
    const { username, content } = req.body;
    posts.push({ username, content });
    res.redirect("/");
})



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});