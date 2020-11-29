import React, { useLayoutEffect } from "react";
import "./styles/App.css";
import Header from "./widgets/header";
import Footer from "./widgets/footer";
import Login from "./pages/login";
import { HashRouter as BrowserRouter, Switch, Route } from "react-router-dom";
import FormProblems from "./pages/formProblems";
import Home from "./pages/home";
import Contact from "./pages/contact";
import ListProblems from "./pages/listProblems";
import listMessage from "./pages/listMessage";
import Firebase from "./services/firebase-connect";
import Register from "./pages/register";

function App() {
	const [user, setUser] = React.useState(null);

	const PrivateRoute = ({ component: Component, ...rest }) => {
		return (
			<Route
				render={(props) => {
					if (user) {
						return <Component {...props} />;
					} else {
						return <Login />;
					}
				}}
			/>
		);
	};

	function verifyUser() {
		Firebase.auth().onAuthStateChanged((userFirebase) => {
			if (userFirebase != null) {
				setUser(userFirebase.uid);
			} else {
				setUser(null);
			}
		});
	}

	useLayoutEffect(() => {
		verifyUser();
	}, []);

	return (
		<BrowserRouter>
			<Header
				key={`header-${user}`}
				user={user}
				verifyUser={verifyUser}
			/>
			<Switch>
				<Route path="/login">
					<Login verifyUser={verifyUser} />
				</Route>
				<Route path="/" exact={true} component={Home} />
				<Route path="/register" component={Register} />
				<PrivateRoute path="/add" component={FormProblems} />
				<PrivateRoute path="/messages" component={listMessage} />
				<PrivateRoute path="/contact" component={Contact} />
				<PrivateRoute path="/list" component={ListProblems} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
