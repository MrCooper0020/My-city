import React from "react";

import {
	TextField,
	Fab,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Snackbar,
} from "@material-ui/core";
import "../styles/form.css";
import Firebase from "../services/firebase-connect";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import Geocode from "react-geocode";

export default function FormProblems() {
	const [name, setName] = React.useState("");
	const [importance, setImportance] = React.useState(1);
	const [description, setDescription] = React.useState("");
	const [local, setLocal] = React.useState("");
	const [isRepair, setIsRepair] = React.useState(true);
	const [msgOpen, setMsgOpen] = React.useState(false);
	const [msgText, setMsgText] = React.useState("");
	const [msgErrorType, setMsgErrorType] = React.useState(false);

	const saveProblem = () => {
		Geocode.setApiKey("AIzaSyDvdkyqaq8Cu2fVp_9EQNNnhMoDmT-GXt4");

		Geocode.fromAddress(local).then(
			(response) => {
				const { lat, lng } = response.results[0].geometry.location;

				let problemObject = {
					name,
					importance,
					description,
					local,
					isRepair,
					isComplete: false,
					lat,
					lng,
				};

				let uuid = uuidv4();

				Firebase.database()
					.ref(`Problems/${uuid}`)
					.set(problemObject)
					.then(() => {
						setName("");
						setImportance("");
						setDescription("");
						setLocal("");
						messagePopup(true, "Problema enviado com sucesso!");
					})
					.catch((err) => {
						messagePopup(true, "Erro ao enviar Problema!", false);
					});
			},
			(error) => {
				console.error(error);
			},
		);
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
			<Grid item xs={12} className="titleBox">
				<h1>Cadastro de um novo problema</h1>
			</Grid>
			<Grid item xs={12} className="inputBox">
				<TextField
					id="name"
					label="Nome do Problema"
					variant="outlined"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} className="inputBox">
				<TextField
					id="description"
					label="Descrição do problema"
					variant="outlined"
					value={description}
					multiline
					rows={4}
					fullWidth
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
			</Grid>
			<Grid container spacing={2} className="multiInputBox">
				<Grid item xs={12} sm={3}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel id="importance-label">Gravidade</InputLabel>
						<Select
							labelId="importance-label"
							id="importance"
							value={importance}
							onChange={(e) => {
								setImportance(e.target.value);
							}}
							label="Gravidade"
						>
							<MenuItem value={1}>Baixo</MenuItem>
							<MenuItem value={2}>Medio</MenuItem>
							<MenuItem value={3}>Grave</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={3}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel id="type-label">Tipo</InputLabel>
						<Select
							labelId="type-label"
							id="isRepair"
							value={isRepair}
							onChange={(e) => {
								setIsRepair(e.target.value);
							}}
							label="Tipo"
						>
							<MenuItem value={true}>Manutencao</MenuItem>
							<MenuItem value={false}>Pedido</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="local"
						label="Localização"
						variant="outlined"
						fullWidth
						value={local}
						onChange={(e) => {
							setLocal(e.target.value);
						}}
					/>
				</Grid>
			</Grid>
			<Grid item xs={12} className="buttonBox">
				<Fab
					variant="extended"
					color="primary"
					aria-label="add"
					style={{ marginRight: 10 }}
					onClick={saveProblem}
				>
					Enviar
				</Fab>
				<Link to="/list">
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
