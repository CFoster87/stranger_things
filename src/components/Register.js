import React, { useState } from "react";
import Posts from "./Posts";

async function registerUser(username, password) {
	return fetch(
		"https://strangers-things.herokuapp.com/api/2204-ftb-et-web-pt/users/register",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: {
					username: username,
					password: password,
				},
			}),
		}
	)
		.then((response) => response.json())
		.then((result) => {
			return result;
		})
		.catch(console.error);
}

export default function Register({ setToken, setUser, setIsLoggedIn }) {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [verify, setVerify] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === verify) {
			const data = await registerUser(username, password);
			const token = data.data.token;
			const user = setUser(username);
			localStorage.setItem("token", JSON.stringify(token));
			setToken(token);
            setIsLoggedIn(true)
		} else {
			alert("Passwords do not match!");
		}
	};

	const registerStyle = {
		div: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		}
	}

	return (
		<div style={registerStyle.div}>
		<form onSubmit={handleSubmit}>
			<h2> Please Register </h2>
			<label>
				<p>Username</p>
				<input type='text' onChange={(e) => setUsername(e.target.value)} />
			</label>
			<label>
				<p>Password</p>
				<input type='password' onChange={(e) => setPassword(e.target.value)} />
			</label>
			<label>
				<p>Retype Password</p>
				<input type='password' onChange={(e) => setVerify(e.target.value)} />
			</label>
			<div>
				<button type='submit'>Submit</button>
			</div>
		</form>
		</div>
	);
}
