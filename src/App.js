import React from "react";
import "./styles/App.css";
import Header from "./widgets/header";
import Login from "./pages/login";
import Home from "./pages/home";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {

	const PrivateRoute = ({ component: Component, ...rest }) => {
		return (
			<Route
				render={(props) => {
					if (sessionStorage.getItem("token-key")) {
						return <Component {...props} />;
					} else {
						return <Login />;
					}
				}}
			/>
		);
	};

	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/" exact={true} component={Login} />
				<PrivateRoute path="/home" component={Home} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
