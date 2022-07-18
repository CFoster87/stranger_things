import React, { useState, useEffect } from "react"


export default function Dashboard(props) {

    const [posts, setPosts] = useState([])
    const [messages, setMessages] = useState([])
    
    const token = props.token

useEffect(() => {

    const fetchPostsAndMessages = async () => {
    await fetch("https://strangers-things.herokuapp.com/api/2204-ftb-et-web-pt/users/me",
    {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
}).then(response => response.json())
  .then(result => {
    setPosts(result.data.posts)
    setMessages(result.data.messages)
    console.log("fetchPosts Result", result);
  })
  .catch(console.error);
}
fetchPostsAndMessages()


    }, [])

    const postStyle = {

        body: {
          backgroundColor: "grey"
        },
        card: {
          backgroundColor: "lightgrey",
          display: "block",
          borderRadius: "30px",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "15px",
          marginBottom: "5px"
        },
        title: {
          padding: "15px",
          color: "white",
          borderBottom: "2px solid black"
        }
    }

    return <div>
        <body style={postStyle.body}>
        <div>
			<h1 style={postStyle.title}> Posts </h1>

			{posts.map((post) => {
				return (
					<div style={postStyle.card} key={post._id}>
						<h2>{post.title}</h2>
						<p>{post.author.username}</p>
						<p>{post.description}</p>
						<aside>Location: {post.location}</aside>
						<aside>Price: {post.price}</aside>
                        <p>Will deliver? {post.willDeliver}</p>
						<p>Last Updated: {post.updatedAt}</p>
                        
					</div>
				);
			})}
		</div>


        <div>
        <h1 style={postStyle.title}> Messages</h1>

			{messages.map((message) => {
				return (
					<div style={postStyle.card}>
						<h2>{message.post.title}</h2>
						<p>From {message.fromUser.username}</p>
						<p>{message.content}</p>
					</div>
				);
			})}
		</div>
        </body>
    </div>
}