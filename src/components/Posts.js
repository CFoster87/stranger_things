import React, { useState, useEffect } from "react";

const Posts = () => {
	const [posts, setPosts] = useState([]);

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
	);
};

export default Posts;
