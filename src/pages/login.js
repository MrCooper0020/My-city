import React, { useLayoutEffect } from "react";
import {
	TextField,
	Button,
	Grid,
	FormControlLabel,
	Switch,
	Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "../styles/login.css";
import Firebase from "../services/firebase-connect";
import { useHistory } from "react-router-dom";

export default function Login() {
	const [warningMsgActive, setWarningMsgActive] = React.useState(false);
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [rememberData, setRememberData] = React.useState(false);
	let history = useHistory();

	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	function loginAccount() {
		if (!rememberData) {
			localStorage.removeItem("email");
			localStorage.removeItem("password");
		}

		Firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.then((dataReturn) => {
				setWarningMsgActive(false);

				if (rememberData) {
					localStorage.setItem("email", email);
					localStorage.setItem("password", password);
				}

				sessionStorage.setItem("token-key", dataReturn.user.uid);

				setTimeout(() => {
					history.push("/");
				}, 500);
			})
			.catch((error) => {
				setWarningMsgActive(true);
			});
	}

	useLayoutEffect(() => {
		setEmail(
			localStorage.getItem("email") ? localStorage.getItem("email") : "",
		);
		setPassword(
			localStorage.getItem("password")
				? localStorage.getItem("password")
				: "",
		);

		if (localStorage.getItem("email") && localStorage.getItem("password")) {
			setRememberData(true);
		}
	}, []);

	return (
		<form className="loginContainer">
			<Grid item xs={12} className="itemBox">
				<h1>Login</h1>
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
				<FormControlLabel
					control={
						<Switch
							checked={rememberData}
							name="checkedB"
							color="primary"
							onClick={() => setRememberData(!rememberData)}
						/>
					}
					label="Lembrar-me"
				/>
			</Grid>
			<Grid item xs={12} className="itemBox">
				<Button
					variant="contained"
					size="large"
					color="primary"
					onClick={() => loginAccount()}
					style={{  marginRight: 5  }}
				>
					Entrar
				</Button>
				<Button variant="contained" size="large" color="primary">
					Cadastrar
				</Button>
			</Grid>
			<Snackbar open={warningMsgActive}>
				<Alert severity="error">Email ou senha estao incorretas!</Alert>
			</Snackbar>
		</form>
	);
}
