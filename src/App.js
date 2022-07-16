import "./App.css";
import React, { useState } from "react";
import Posts from "./components/Posts";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import SubmitPost from "./components/SubmitPost";
import Dashboard from "./components/Dashboard"
import { Link, Route, Routes } from "react-router-dom";

const App = () => {
	const getToken = () => {
		const tokenString = localStorage.getItem("token");
		const userToken = JSON.parse(tokenString);
		console.log("userToken", userToken);
		return userToken?.token;
	};
	const [token, setToken] = useState();
	const [user, setUser] = useState();

	getToken();
	console.log("token in app.js", token);

	const logOutUser = () => {
		setToken("");
		localStorage.clear();
	};

	if (!token) {
		return (
			<div>
				<header>
					<Link to='/'>Home</Link>
					<Link to='login'>Login</Link>
					<Link to='/register'>Register</Link>
				</header>

				<Routes>
					<Route exact path='/' element={<Posts />}></Route>
					<Route
						exact
						path='/login'
						element={<LogIn setToken={setToken} setUser={setUser} />}
					></Route>
					<Route
						exact
						path='register'
						element={<Register setToken={setToken} setUser={setUser} />}
					></Route>
				</Routes>
			</div>
		);
	} else {
		return (
			<div>
				<header className='user-bar'>
					<p>Greetings, {user}!</p>
					<Link to='/'>Home</Link>
          <Link to='/dashboard'>Dashboard</Link>
					<Link to='/submitpost'>Submit a Post</Link>
					<button onClick={logOutUser}>Logout</button>
				</header>

				<Routes>
					<Route exact path='/' element={<Posts />}></Route>
					<Route exact path='/submitpost'	element={<SubmitPost token={token} />}></Route>
          <Route exact path='/dashboard' element={<Dashboard token={token} />}></Route>
				</Routes>
			</div>
		);
	}
};

export default App;
