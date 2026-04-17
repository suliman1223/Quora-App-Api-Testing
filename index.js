const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const{v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
let posts = [
    {
        id: uuidv4(),
        username: "sajjad Dotani",
        content: "Sajjad Dotani is a software engineer with expertise in web development and machine learning. He has a passion for creating innovative solutions and is always eager to learn new technologies."

    },
    {
        id: uuidv4(),
        username: "John Doe",
        content: "John Doe is a fictional character often used as a placeholder name in legal proceedings and discussions. The name is commonly used to refer to an anonymous or unidentified person."
    },
    {
        id: uuidv4(),
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
app.get("/posts/:id/edit", (req, res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);
    res.render("edit.ejs", { post: post });
});
app.post("/new/posts", (req, res) => {
    const { username, content } = req.body;
    const id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/");
})

app.patch("/posts/:id", (req, res) => {
    const {id} = req.params;
    let content=req.body.content;
    const post = posts.find(p => p.id === id);
    if (post) {
        post.content = content;
        res.redirect("/");
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});