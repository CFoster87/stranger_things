import React, { useState, useEffect } from "react"


export default function Dashboard(props) {

    const [posts, setPosts] = useState()
    const [messages, setMessages] = useState()

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
    
    console.log(result);
  })
  .catch(console.error);
}
fetchPostsAndMessages()

    }, [])

    return <div>
        <h1> DASHBOARD </h1>
        <div>
			<h1> Posts </h1>

			{posts.map((post) => {
				return (
					<div key={post._id}>
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
        <h1> Messages</h1>

			{messages.map((message) => {
				return (
					<div key={message._id}>
						<h2>{message.post.title}</h2>
						<p>From {message.fromUser.username}</p>
						<p>{message.content}</p>
					</div>
				);
			})}
		</div>
    </div>
}