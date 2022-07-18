import "./App.css";
import React, { useState } from "react";
import Posts from "./components/Posts";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import SubmitPost from "./components/SubmitPost";
import Dashboard from "./components/Dashboard"
import { Link, Route, Routes } from "react-router-dom";

const App = () => {

  const [token, setToken] = useState();
	const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState()


	const getToken = () => {
		const tokenString = localStorage.getItem("token");
		const userToken = JSON.parse(tokenString);
    if(userToken) {setIsLoggedIn(true)}
		return userToken?.token;
	};


	getToken();

	const logOutUser = () => {
		setToken("");
		localStorage.clear();
    setIsLoggedIn(false)
	};

	const headerStyle = {
		header: {
			backgroundColor: "blue",
			padding: "10px",
			display: "flex",
			alignItems: "center"

		},
		link: {
			display: "flex",
			textJustify: "center",
			backgroundColor: "white",
			borderRadius: "10px",
			padding: "5px",
			margin: "5px",
			border: "1px solid black"
		},
		logout: {
			display: "flex",
			float: "right",
		},

		greeting: {
			display: "flex",
		},

		user: {
			display: "flex",
			flexDirection: "column",
			backgroundColor: "white",
			borderRadius: "15px",
			padding: "5px"
		},
	}


	if (!isLoggedIn) {
		return (
			<div>
				<header style={headerStyle.header}>
					<h1>Stranger Things</h1>
					<Link style={headerStyle.link} to='/'>Home</Link>
					<Link style={headerStyle.link} to='login'>Login</Link>
					<Link style={headerStyle.link} to='/register'>Register</Link>
				</header>

				<Routes>
					<Route exact path='/' element={<Posts token={token} isLoggedIn={isLoggedIn} />}></Route>
					<Route
						exact
						path='/login'
						element={<LogIn setToken={setToken} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}
					></Route>
					<Route
						exact
						path='register'
						element={<Register setToken={setToken} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}
					></Route>
				</Routes>
			</div>
		);
	} else {
		return (
			<div>
				<header style={headerStyle.header} className='user-bar'>
					<h1>Stranger Things</h1>
					<Link style={headerStyle.link} to='/'>Home</Link>
					<Link style={headerStyle.link} to='/submitpost'>Submit a Post</Link>
					<div style={headerStyle.user}>
					<p>Greetings, {user}!</p>
					<Link style={headerStyle.link} to='/dashboard'>Dashboard</Link>
					<button style={headerStyle.link} onClick={logOutUser}>Logout</button>
					</div>
				</header>

				<Routes>
					<Route exact path='/' element={<Posts token={token} isLoggedIn={isLoggedIn} />}></Route>
					<Route exact path='/submitpost'	element={<SubmitPost token={token} />}></Route>
          			<Route exact path='/dashboard' element={<Dashboard token={token} />}></Route>
				</Routes>
			</div>
		);
	}
};

export default App;
