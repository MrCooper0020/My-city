import React from "react";

import {
	TextField,
	Button,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";

export default function FormProblems() {
	const [age, setAge] = React.useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<form style={{ margin: 10 }}>
			<Grid item xs={12} style={{ marginBottom: 10, marginTop: 20 }}>
				<h1>Cadastro de novo problema</h1>
			</Grid>
			<Grid item xs={12} style={{ marginBottom: 10, marginTop: 20 }}>
				<TextField
					id="name"
					label="Nome do Problema"
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} style={{ marginBottom: 10 }}>
				<TextField
					id="description"
					label="Descricao do problema"
					variant="outlined"
					multiline
					rows={4}
					fullWidth
				/>
			</Grid>
			<Grid xs={12} sm={6} style={{ marginBottom: 10 }}>
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
			<Grid xs={12} sm={6} style={{ marginBottom: 10 }}>
				<TextField
					id="local"
					label="Localizacao"
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} style={{ marginBottom: 10 }}>
				<Button
					variant="contained"
					color="primary"
					style={{ marginRight: 10 }}
				>
					Enviar
				</Button>
				<Button variant="contained" color="secondary">
					Cancelar
				</Button>
			</Grid>
		</form>
	);
}
