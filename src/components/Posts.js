import React, { useState, useEffect } from "react";

const Posts = (props) => {
	const [posts, setPosts] = useState([]);
  const {token, isLoggedIn} = props

	useEffect(() => {
		const fetchPosts = async () => {
			const url =
				"https://strangers-things.herokuapp.com/api/2204-ftb-et-web-pt/posts";
			const response = await fetch(url);
			const json = await response.json();
			setPosts(json.data.posts);

		};

		fetchPosts();
	}, []);

if (!isLoggedIn){
	return (
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
	);}

  else {
    return (
      <div>
			<h1> Posts </h1>

			{posts.map((post) => {
        console.log(post)
				return (
					<div key={post._id}>
						<h2>{post.title}</h2>
						<p>{post.author.username}</p>
						<p>{post.description}</p>
						<aside>Location: {post.location}</aside>
						<aside>Price: {post.price}</aside>
            <p>Will deliver? {post.willDeliver}</p>
						<p>Last Updated: {post.updatedAt}</p>
            <button>Message</button>
            {post.isAuthor = true && <button>Delete</button>}
					</div>
				);
			})}
		</div>
    )
  }
};

export default Posts;
