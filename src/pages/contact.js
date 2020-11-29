import React from "react";
import { TextField, Fab, Grid, Snackbar } from "@material-ui/core";
import "../styles/form.css";
import { v4 as uuidv4 } from "uuid";
import MuiAlert from "@material-ui/lab/Alert";
import Firebase from "../services/firebase-connect";
import { Link } from "react-router-dom";

export default function Contact() {

	const [name, setName] = React.useState();
	const [email, setEmail] = React.useState();
	const [subject, setSubject] = React.useState();
	const [message, setMessage] = React.useState();

	const [msgOpen, setMsgOpen] = React.useState(false);
	const [msgText, setMsgText] = React.useState("");
	const [msgErrorType, setMsgErrorType] = React.useState(false);

	const saveMessage = () => {
		let messageObject = {
			name,
			email,
			subject,
			message,
		};

		let uuid = uuidv4();

		Firebase.database()
			.ref(`Messages/${uuid}`)
			.set(messageObject)
			.then(() => {
				setName("");
				setEmail("");
				setSubject("");
				setMessage("");
				messagePopup(true, "Mensagem enviado!");
			})
			.catch((err) => {
				messagePopup(true, "Erro ao enviar a mensagem!", false);
			});
	};

	const messagePopup = (open, text, error = false) => {
		setMsgOpen(open);
		setMsgText(text);
		setMsgErrorType(error);

		setTimeout(() => {
			setMsgOpen(false);
		}, 5000);
	};

	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	return (
		<form className="formContainer">
			<Grid item xs={12} sm={12} className="titleBox">
				<h1>Contato</h1>
			</Grid>
			<Grid item xs={12} sm={12} className="inputBox">
				<TextField
					id="name"
					label="Nome"
					variant="outlined"
					value={name}
					onChange={(e) => setName(e.target.value)}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={12} className="inputBox">
				<TextField
					id="email"
					label="Email"
					variant="outlined"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={12} className="inputBox">
				<TextField
					id="subject"
					label="Assunto"
					variant="outlined"
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={12} className="inputBox">
				<TextField
					id="message"
					label="Mensagem"
					variant="outlined"
					multiline
					rows={8}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={12} className="buttonBox">
				<Fab
					variant="extended"
					color="primary"
					aria-label="add"
					style={{ marginRight: 10 }}
					onClick={() => saveMessage()}
				>
					Enviar
				</Fab>
				<Link to="/messages">
					<Fab variant="extended" color="secondary" aria-label="add">
						Cancelar
					</Fab>
				</Link>
			</Grid>
			<Snackbar open={msgOpen}>
				<Alert severity={msgErrorType ? "error" : "success"}>
					{msgText}
				</Alert>
			</Snackbar>
		</form>
	);
}
