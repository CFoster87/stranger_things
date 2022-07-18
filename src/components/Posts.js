import { findByLabelText } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import Search from "./Search"

const Posts = (props) => {
	const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('')
  const [postId, setPostId] = useState('')
  const [filteredPosts, setFilteredPosts ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState("")

  const {token, isLoggedIn} = props
  const url = "https://strangers-things.herokuapp.com/api/2204-ftb-et-web-pt/posts";

const handleSubmit = (e) => {
  e.preventDefault()
  const fetchMessage = async () => {
    const fetchURL = `${url}/${postId}/messages`
    console.log("url ", fetchURL)
    fetch(fetchURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: message
      }
      }),
    }).then((response) => response.json())
    .then((result) => {
      console.log("fetchMessage result", result)
    })
    .catch(console.error);
  }
  fetchMessage()
}

const messageSetter = (message, post) => {
  setMessage(message)
  setPostId(post)
}

const deletePost = (id) => event => {
  event.preventDefault();
  id.slice(-1,0)
  console.log(id)
  console.log("Clicked!")
  const deleteURL = `${url}/${id}`
  console.log(deleteURL)
  fetch(deleteURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,     
    }
  }).then(response => response.json())
  .then(result => {
    console.log(result)
  })
  .catch(console.error)
}


	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }});
			const json = await response.json();
      if(!filteredPosts){
			setPosts(json.data.posts);
      }
      else {setPosts(filteredPosts)}
		};

		fetchPosts();
	}, [deletePost, setPosts, setSearchTerm]);

  const postStyle = {
      span: {
        display: "flex",
        backgroundColor: "blue",
      },
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

if (!isLoggedIn){
	return (
		<div>
      <header>
        <span style={postStyle.span}>
          <Search posts={posts} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setFilteredPosts={setFilteredPosts}/>
        </span>
      </header>

      <body style={postStyle.body}>
			<h1 style={postStyle.title}> Posts </h1>

			{posts.map((post) => {
				return (
					<div style={postStyle.card} key={post._id}>
						<h2>{post.title}</h2>
						<p>{post.author.username}</p>
						<p>{post.description}</p>
						<aside>Location: {post.location}</aside>
						<aside>Price: {post.price}</aside>
            {post.willDeliver && <p>Will deliver</p>}
						<p>Last Updated: {post.updatedAt}</p>
					</div>
				);
			})}
      </body>
		</div>
	);}

  else {
    return (
      <div>
        <header>
        <span style={postStyle.span}>
          <Search posts={posts} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setFilteredPosts={setFilteredPosts}/>
        </span>
      </header>
      <body style={postStyle.body}>
			<h1 style={postStyle.title}> Posts </h1>

			{posts.map((post) => {
				return (
					<div style={postStyle.card} key={post._id}>
						<h2>{post.title}</h2>
						<p>{post.author.username}</p>
						<p>{post.description}</p>
						<aside>Location: {post.location}</aside>
						<aside>Price: {post.price}</aside>
            {post.willDeliver && <p>Will deliver</p>}
						<p>Last Updated: {post.updatedAt}</p>
            {post.isAuthor && <button onClick={deletePost(post._id)}>Delete</button>}
            {!post.isAuthor && <form onSubmit={handleSubmit}>
            <label>
					    <p>Message</p>
					    <input type='text' onChange={(e) => messageSetter(e.target.value, post._id)} />
				    </label>
              <button type='sumbit'>Send</button>
            </form>}

					</div>
				);
			})}
      </body>
		</div>
    )
  }
};

export default Posts;
