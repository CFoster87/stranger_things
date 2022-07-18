import React, { useState } from "react";
import { useNavigate } from 'react-router';


async function loginUser(username, password) {

	return fetch(
		"https://strangers-things.herokuapp.com/api/2204-ftb-et-web-pt/users/login",
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
			console.log("Login Result", result);
			return result;
		});
}

export default function LogIn({ setToken, setUser, setIsLoggedIn }) {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

    const navigate = useNavigate()


	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await loginUser(username, password);
		const token = data.data.token;
		setUser(username);
		sessionStorage.setItem("token", JSON.stringify(token));
		if (!data.data.success) {
			setToken(token);
            setIsLoggedIn(true)
            navigate('/')
		} else {
			alert("Username or Password is invalid, try again.");
		} 

	};

	const loginStyle = {
		div: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		}
	}

	return (
		<div style={loginStyle.div}>
		<form onSubmit={handleSubmit}>
			<h2>Please Login!</h2>
			<label>
				<p>Username</p>
				<input type='text' onChange={(e) => setUsername(e.target.value)} />
			</label>
			<label>
				<p>Password</p>
				<input type='password' onChange={(e) => setPassword(e.target.value)} />
			</label>
			<div>
				<button type='submit'>Submit</button>
			</div>
		</form>
		</div>
	);
}
