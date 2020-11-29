import React, { useLayoutEffect } from "react";
import "./styles/App.css";
import Header from "./widgets/header";
import Footer from "./widgets/footer";
import Login from "./pages/login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import FormProblems from "./pages/formProblems";
import Home from "./pages/home";
import Contact from "./pages/contact";
import ListProblems from "./pages/listProblems";
import listMessage from "./pages/listMessage";
import Firebase from "./services/firebase-connect";

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

	useLayoutEffect(() => {
		Firebase.auth().onAuthStateChanged((user) => {
			if (user != null) {
				setUser(user.uid);
			} else {
				setUser(null);
			}
		});
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/" exact={true} component={Home} />
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
