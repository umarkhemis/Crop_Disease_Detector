// import React, { useState, useEffect } from "react";
// import API from "../api";

// const ForumPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

// //   useEffect(() => {
// //     API.get("/forum/")
// //       .then(response => {
// //         console.log("API Response:", response.data);  // Debugging
// //         setPosts(response.data);
// //       })
// //       .catch(error => {
// //         console.error("Error fetching posts:", error);
// //         setPosts([]); // Ensure `posts` is not undefined
// //       });
// //   }, []);

// useEffect(() => {
//     API.get("/forum/")
//         .then(response => {
//             console.log("Fetched posts:", response.data);  // Debugging API response
//             setPosts(response.data);
//         })
//         .catch(error => console.error("Error fetching posts:", error));
// }, []);

// //   const handlePost = async () => {
// //     await API.post("/forum/", { title, content });
// //     setTitle("");
// //     setContent("");
// //   };



//     const handlePost = async () => {
//         if (!title || !content) {
//             console.error("Title and content are required.");
//             return;
//         }

//         try {
//             const postData = { title, content }; // Ensure "content" is sent correctly
//             console.log("Sending request with data:", postData);

//             const response = await API.post("/forum/", postData);
//             console.log("Response from server:", response.data);

//             setPosts([response.data, ...posts]); // Add new post to list
//             setTitle("");
//             setContent("");

//         } catch (error) {
//             console.error("Error posting:", error.response?.data || error);
//         }
//     };


//   const handleLikeDislike = async (postId, replyId, action) => {
//     try {
//       const response = await API.post(`/forum/${postId}/reply/${replyId}/${action}/`);
      
//       setPosts(posts.map(post => {
//         if (post.id === postId) {
//           return {
//             ...post,
//             comments: post.comments.map(comment => 
//               comment.id === replyId 
//                 ? { ...comment, likes: response.data.likes, dislikes: response.data.dislikes } 
//                 : comment
//             )
//           };
//         }
//         return post;
//       }));
//     } catch (error) {
//       console.error("Error liking/disliking reply:", error);
//     }
//   };


//     const handleReply = async (postId) => {
//         if (!replyContent[postId]) return;

//         const requestBody = {
//             post: postId,  
//             comment: replyContent[postId]  
//         };

//         console.log("Sending request:", requestBody); // Debugging log

//         try {
//             const response = await API.post(`/forum/${postId}/reply/`, requestBody);
            
//             setPosts(posts.map(post => 
//                 post.id === postId ? { 
//                     ...post, 
//                     comments: [...post.comments, response.data]  // Change `replies` to `comments`
//                 } : post
//             ));
//             setReplyContent({ ...replyContent, [postId]: "" });

//         } catch (error) {
//             console.error("Error replying:", error.response?.data || error);
//         }
//     };



//   return (
//     <div className="container mt-4">
//       <h2>Community Forum</h2>
//       <div>
//         <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
//         <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
//         <button onClick={handlePost}>Post</button>
//       </div>
//       <ul>
//         {posts && posts.length > 0 ? (
//           posts.map((post, index) => (
//             <li key={index}>
//               <strong>{post.title}</strong>: {post.content}
//             </li>
//           ))
//         ) : (
//           <p>No posts available.</p> // Handle empty or undefined state
//         )}
//       </ul>

//         <ul>
//             {posts.map((post) => (
//                 <li key={post.id}>
//                 <strong>{post.title}</strong>: {post.content}
                
//                 {/* Replies Section */}
//                 <div>
//                     <h4>Replies:</h4>
//                     {post.comments && post.comments.length > 0 ? (
//                     post.comments.map((reply) => (
//                         <div key={reply.id} style={{ paddingLeft: "20px", borderLeft: "2px solid #ddd" }}>
//                         <p><strong>{reply.user}:</strong> {reply.comment}</p>
//                         <button onClick={() => handleLikeDislike(post.id, reply.id, "like")}>👍 {reply.likes}</button>
//                         <button onClick={() => handleLikeDislike(post.id, reply.id, "dislike")}>👎 {reply.dislikes}</button>
//                         </div>
//                     ))
//                     ) : (
//                     <p>No replies yet.</p>
//                     )}
//                 </div>
//                 </li>
//             ))}
//         </ul>

//     </div>
//   );
// };

// export default ForumPage;






import React, { useState, useEffect, useContext } from "react";
import { Button, TextField, Paper, Typography, Box, IconButton, Divider } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
// import API from "../api";
import API from "../api";
import { AuthContext } from "../Components/AuthContext";
// import AuthContext from "../Pages/AuthContext";

const ForumPage = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [replyContent, setReplyContent] = useState({});

  useEffect(() => {
    API.get("/forum/")
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  const handlePost = async () => {
    if (!title || !content) return;
    try {
      const response = await API.post("/forum/", { title, content });
      setPosts([response.data, ...posts]); // Add new post to the list
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await API.delete(`/forum/${postId}/delete/`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleReply = async (postId) => {
    if (!replyContent[postId]) return;
    try {
      const response = await API.post(`/forum/${postId}/reply/`, { content: replyContent[postId] });
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, comments: [...post.comments, response.data] } : post
      ));
      setReplyContent({ ...replyContent, [postId]: "" });
    } catch (error) {
      console.error("Error replying:", error);
    }
  };

  const handleLikeDislike = async (postId, replyId, action) => {
    try {
      const response = await API.post(`/forum/comment/${postId}/like-dislike/`);
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            replies: post.replies.map(reply => 
              reply.id === replyId ? { ...reply, likes: response.data.likes, dislikes: response.data.dislikes } : reply
            )
          };
        }
        return post;
      }));
    } catch (error) {
      console.error("Error liking/disliking reply:", error);
    }
  };

  return (
    <>
    <Typography variant="h4" gutterBottom>
        Community Forum
    </Typography>
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Community Forum
      </Typography>
      {user && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handlePost}>
            Post
          </Button>
        </Paper>
      )}

      {posts.map(post => (
        <Paper key={post.id} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body1">{post.content}</Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>By {post.author}</Typography>
          {user && user.username === post.author && (
            <IconButton color="error" onClick={() => handleDelete(post.id)}>
              <DeleteIcon />
            </IconButton>
          )}
          <Divider sx={{ my: 2 }} />
          <TextField
            fullWidth
            label="Write a reply..."
            value={replyContent[post.id] || ""}
            onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
            sx={{ mb: 1 }}
          />
          <Button variant="contained" startIcon={<ReplyIcon />} onClick={() => handleReply(post.id)}>
            Reply
          </Button>

          {/* {post.replies.map(reply => (
            <Paper key={reply.id} sx={{ p: 2, mt: 1 }}>
              <Typography variant="body1">{reply.content}</Typography>
              <Typography variant="caption" sx={{ color: "gray" }}>By {reply.author}</Typography>
              <IconButton color="primary" onClick={() => handleLikeDislike(post.id, reply.id, "like")}>
                <ThumbUpIcon />
              </IconButton>
              {reply.likes}
              <IconButton color="secondary" onClick={() => handleLikeDislike(post.id, reply.id, "dislike")}>
                <ThumbDownIcon />
              </IconButton>
              {reply.dislikes}
            </Paper>
          ))} */}


            {/* <div>
                <h4>Replies:</h4>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((reply) => (
                        <div key={reply.id} style={{ paddingLeft: "20px", borderLeft: "2px solid #ddd" }}>
                        <p><strong>{reply.user}:</strong> {reply.comment}</p>
                        <button onClick={() => handleLikeDislike(post.id, reply.id, "like")}>👍 {reply.likes}</button>
                        <button onClick={() => handleLikeDislike(post.id, reply.id, "dislike")}>👎 {reply.dislikes}</button>
                        </div>
                    ))
                    ) : (
                    <p>No replies yet.</p>
                )}
            </div> */}



        {/* <ul>
            {posts && posts.length > 0 ? (
            posts.map((post, index) => (
                <li key={index}>
                <strong>{post.title}</strong>: {post.content}
                </li>
            ))
            ) : (
            <p>No posts available.</p> // Handle empty or undefined state
            )}
        </ul> */}

        <ul style={{listStyle: "none"}}>
          {posts.map((post) => (
            <li key={post.id}>
            {/* // <strong>{post.title}</strong>: {post.content} */}
            
            {/* Replies Section */}
            <div>
                <h4 style={{listStyle: "none"}}>Replies:</h4>
                {/* {post.comments && post.comments.length > 0 ? ( */}
               {post.comments.map((reply) => (
                  <div key={reply.id} style={{ paddingLeft: "20px", borderLeft: "2px solid #ddd" }}>
                    <p><strong>{reply.user}:</strong> {reply.comment}</p>
                    {/* <button onClick={() => handleLikeDislike(post.id, reply.id, "like")}>👍 {reply.likes}</button>
                    <button onClick={() => handleLikeDislike(post.id, reply.id, "dislike")}>👎 {reply.dislikes}</button> */}
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          color="primary"
                          onClick={() => handleLikeDislike(post.id, reply.id, "like")}
                          sx={{ mr: 1 }}
                        >
                          <ThumbUpIcon />
                        </IconButton>
                        <Typography variant="body2">{reply.likes}</Typography>
                        <IconButton
                          color="secondary"
                          onClick={() => handleLikeDislike(post.id, reply.id, "dislike")}
                          sx={{ mx: 1 }}
                        >
                          <ThumbDownIcon />
                        </IconButton>
                        <Typography variant="body2">{reply.dislikes}</Typography>
                    </Box> 

                  </div>
                ))}
                {/* // ) : ( */}
                {/* // <p>No replies yet.</p> */}
               {/* } */} 
            </div>
            </li>
          ))}
        </ul>

        </Paper>
      ))}
    </Box>
    </>
  );
};

export default ForumPage;










// import React, { useState, useEffect, useContext } from "react";
// import { Button, TextField, Paper, Typography, Box, IconButton, Divider, List, ListItem, ListItemText } from "@mui/material";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ThumbDownIcon from "@mui/icons-material/ThumbDown";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ReplyIcon from "@mui/icons-material/Reply";
// import API from "../api";
// import { AuthContext } from "../Components/AuthContext";

// const ForumPage = () => {
//   const { user } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [replyContent, setReplyContent] = useState({});

//   useEffect(() => {
//     API.get("/forum/")
//       .then(response => setPosts(response.data))
//       .catch(error => console.error("Error fetching posts:", error));
//   }, []);

//   const handlePost = async () => {
//     if (!title || !content) return;
//     try {
//       const response = await API.post("/forum/", { title, content });
//       setPosts([response.data, ...posts]); // Add new post to the list
//       setTitle("");
//       setContent("");
//     } catch (error) {
//       console.error("Error posting:", error);
//     }
//   };

//   const handleDelete = async (postId) => {
//     try {
//       await API.delete(`/forum/${postId}/delete/`);
//       setPosts(posts.filter(post => post.id !== postId));
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   const handleReply = async (postId) => {
//     if (!replyContent[postId]) return;
//     try {
//       const response = await API.post(`/forum/${postId}/reply/`, { content: replyContent[postId] });
//       setPosts(posts.map(post => 
//         post.id === postId ? { ...post, comments: [...post.comments, response.data] } : post
//       ));
//       setReplyContent({ ...replyContent, [postId]: "" });
//     } catch (error) {
//       console.error("Error replying:", error);
//     }
//   };

//   const handleLikeDislike = async (postId, replyId, action) => {
//     try {
//       const response = await API.post(`/forum/comment/${postId}/like-dislike/`, { replyId, action });
//       setPosts(posts.map(post => {
//         if (post.id === postId) {
//           return {
//             ...post,
//             comments: post.comments.map(reply => 
//               reply.id === replyId ? { ...reply, likes: response.data.likes, dislikes: response.data.dislikes } : reply
//             )
//           };
//         }
//         return post;
//       }));
//     } catch (error) {
//       console.error("Error liking/disliking reply:", error);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Community Forum
//       </Typography>
//       {user && (
//         <Paper sx={{ p: 3, mb: 3 }}>
//           <TextField
//             fullWidth
//             label="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Content"
//             multiline
//             rows={4}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <Button variant="contained" color="primary" onClick={handlePost}>
//             Post
//           </Button>
//         </Paper>
//       )}

//       {posts.map(post => (
//         <Paper key={post.id} sx={{ p: 3, mb: 2 }}>
//           <Typography variant="h6">{post.title}</Typography>
//           <Typography variant="body1">{post.content}</Typography>
//           <Typography variant="caption" sx={{ color: "gray" }}>By {post.author}</Typography>
//           {user && user.username === post.author && (
//             <IconButton color="error" onClick={() => handleDelete(post.id)}>
//               <DeleteIcon />
//             </IconButton>
//           )}
//           <Divider sx={{ my: 2 }} />
//           <TextField
//             fullWidth
//             label="Write a reply..."
//             value={replyContent[post.id] || ""}
//             onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
//             sx={{ mb: 1 }}
//           />
//           <Button variant="contained" startIcon={<ReplyIcon />} onClick={() => handleReply(post.id)}>
//             Reply
//           </Button>

//           {/* Replies Section */}
//           <List sx={{ marginTop: 2 }}>
//             {post.comments && post.comments.length > 0 ? (
//               post.comments.map((reply) => (
//                 <ListItem key={reply.id} sx={{ p: 2, borderLeft: '3px solid #3f51b5', marginBottom: 1 }}>
//                   <ListItemText
//                     primary={<Typography variant="body2"><strong>{reply.author}:</strong> {reply.content}</Typography>}
//                     secondary={
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <IconButton
//                           color="primary"
//                           onClick={() => handleLikeDislike(post.id, reply.id, "like")}
//                           sx={{ mr: 1 }}
//                         >
//                           <ThumbUpIcon />
//                         </IconButton>
//                         <Typography variant="body2">{reply.likes}</Typography>
//                         <IconButton
//                           color="secondary"
//                           onClick={() => handleLikeDislike(post.id, reply.id, "dislike")}
//                           sx={{ mx: 1 }}
//                         >
//                           <ThumbDownIcon />
//                         </IconButton>
//                         <Typography variant="body2">{reply.dislikes}</Typography>
//                       </Box>
//                     }
//                   />
//                 </ListItem>
//               ))
//             ) : (
//               <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//                 No replies yet.
//               </Typography>
//             )}
//           </List>
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// export default ForumPage;
