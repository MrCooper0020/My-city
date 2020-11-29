import React, { useLayoutEffect } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "../styles/login.css";
import Firebase from "../services/firebase-connect";
import { useHistory } from "react-router-dom";

export default function Register() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	let history = useHistory();

	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	function createAccount() {
		Firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch((error) => {
				console.log(error);
			});

		setTimeout(() => {
			history.push("/login");
		}, 500);
	}

	useLayoutEffect(() => {}, []);

	return (
		<form className="loginContainer">
			<Grid item xs={12} className="itemBox">
				<h1>Cadastro de nova conta</h1>
			</Grid>
			<Grid item xs={12} className="itemBox">
				<TextField
					id="email"
					label="Email"
					variant="outlined"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} className="itemBox">
				<TextField
					id="password"
					label="Senha"
					variant="outlined"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} className="itemBox">
				<Button
					variant="contained"
					size="large"
					color="primary"
					onClick={() => createAccount()}
					style={{ marginRight: 5 }}
				>
					Se cadastrar
				</Button>
			</Grid>
		</form>
	);
}
