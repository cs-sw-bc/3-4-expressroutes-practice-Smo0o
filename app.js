import express from "express";
import userInfo from "./data/insta.json" with {type:'json'}

const app = express();
const PORT = 3000;

/* ---------------------------------------------
   SERVER LISTEN
---------------------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/users',(req, res)=> {
let result = [...userInfo.users];
res.json(result); 
});


//this gets the id of the user 
app.get('/users/:id',(req, res)=> {
let searchId = Number(req.params.id);
let result = null;
result = userInfo.users.find((users)=>users.id==searchId)
  if (result){
    res.json(result);
  }else
    res.status(404).send("error error")
});

app.get('/posts',(req, res)=> {
let result = [...userInfo.posts];
res.json(result); 
});

app.get('/posts/:id',(req, res)=> {
let searchId = Number(req.params.id);
let result = null;
result = userInfo.posts.find((posts)=>posts.id==searchId)
  if (result){
    res.json(result);
  }else
    res.status(404).send("error error")
});

app.get('/posts/:id/comments',(req, res)=> {
let searchId = Number(req.params.id);
let result = null;
result = userInfo.posts.find((posts)=>posts.id==searchId)
  if (result){
    res.json(result.comments);
  }else
    res.status(404).send("error error")
});

app.get('/posts/:id/comments/:commentId', (req, res)=>{
let searchId = Number(req.params.id);
let commentId = Number(req.params.commentId);

let result = [userInfo.posts.find(post => post.id == searchId)];

if (result[0]) {
    // find the comment with the right ID inside the post
    let comment = result[0].comments.find(c => c.id === commentId);

    if (comment) {
        res.json(comment); // return only that comment
    } else {
        res.status(404).send("Comment not found.");
    }
} else {
    res.status(404).send("Post not found.");
}
});