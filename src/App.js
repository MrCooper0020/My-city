import React from "react";
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
				<Route path="/login" component={Login} />
				<Route path="/" exact={true} component={Home} />
				<PrivateRoute path="/add" component={FormProblems} />
				<PrivateRoute path="/messages" component={listMessage} />
				<Route path="/contact" component={Contact} />
				<Route path="/list" component={ListProblems} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
