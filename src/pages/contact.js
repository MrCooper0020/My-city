import React from "react";
import { TextField, Grid, Fab } from "@material-ui/core";
import "../styles/contact.css";

export default function Contact() {
	return (
		<div>
			<Grid item xs={12} sm={12} className="titleBox">
				<h1>Contato</h1>
			</Grid>
			<Grid item xs={12} sm={12} className="inputBox">
				<TextField
					id="name"
					label="Nome"
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={12} className="inputBox">
				<TextField
					id="email"
					label="Email"
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={12} className="inputBox">
				<TextField
					id="subject"
					label="Assunto"
					variant="outlined"
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
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={12} className="buttonBox">
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
		</div>
	);
}
