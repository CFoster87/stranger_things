import React, { useState } from "react";



export default function SubmitPost(props) {
	let token = props.token;

	const [title, setTitle] = useState();
	const [body, setBody] = useState();
	const [location, setLocation] = useState();
	const [price, setPrice] = useState();
    const [deliver, setDeliver] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		fetch(
			"https://strangers-things.herokuapp.com/api/2204-ftb-et-web-pt/posts",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
					post: {
						title: title,
						description: body,
						price: price,
						location: location,
                        willDeliver: deliver,
					},
				}),
			}
		)
			.then((response) => response.json())
			.then((result) => {
                console.log(result)
                return result
			})
			.catch(console.error);




	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>Write Your Post Below</h1>
				<label>
					<p>Title</p>
					<input type='text' onChange={(e) => setTitle(e.target.value)} />
				</label>
				<label>
					<p>Body</p>
					<input type='text' onChange={(e) => setBody(e.target.value)} />
				</label>
				<label>
					<p>Location</p>
					<input type='text' onChange={(e) => setLocation(e.target.value)} />
				</label>
				<label>
					<p>Price</p>
					<input type='text' onChange={(e) => setPrice(e.target.value)} />
				</label>
                <div>
                    <input type="checkbox" id="deliver" name="deliver" value="deliver" onChange={(e) => setDeliver(e.target.value)}></input>
                    <label for="deliver"> I will deliver</label>
                </div>
				<div>
					<button type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
}
