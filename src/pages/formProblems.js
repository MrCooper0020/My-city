import React from "react";

import {
	TextField,
	Fab,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";
import "../styles/form.css";

export default function FormProblems() {
	const [age, setAge] = React.useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};

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
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} className="inputBox">
				<TextField
					id="description"
					label="Descricao do problema"
					variant="outlined"
					multiline
					rows={4}
					fullWidth
				/>
			</Grid>
			<Grid container spacing={2} className="multiInputBox">
				<Grid item xs={12} sm={4}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel id="importance-label">
							Gravidade do problema
						</InputLabel>
						<Select
							labelId="importance-label"
							id="importance"
							value={age}
							onChange={handleChange}
							label="Gravidade do Problema"
						>
							<MenuItem value={1}>Baixo</MenuItem>
							<MenuItem value={2}>Medio</MenuItem>
							<MenuItem value={3}>Grave</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={8}>
					<TextField
						id="local"
						label="Localizacao"
						variant="outlined"
						fullWidth
					/>
				</Grid>
			</Grid>
			<Grid item xs={12} className="buttonBox">
				<Fab
					variant="extended"
					color="primary"
					aria-label="add"
					style={{ marginRight: 10 }}
				>
					Enviar
				</Fab>
				<Fab variant="extended" color="secondary" aria-label="add">
					Cancelar
				</Fab>
			</Grid>
		</form>
	);
}
