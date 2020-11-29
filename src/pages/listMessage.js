import React, { useLayoutEffect } from "react";
import Firebase from "../services/firebase-connect";
import {
	Grid,
	Typography,
	CardContent,
	Card,
	Button,
	CardActions,
	Fab,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import "../styles/list.css";

export default function ListMessage() {
	const [list, setList] = React.useState([]);

	const removeMessage = (message) => {
		Firebase.database().ref(`/Messages/${message.uuid}`).remove();
	};

	useLayoutEffect(() => {
		Firebase.database()
			.ref("Messages")
			.on("value", (items) => {
				let data = items.val();

				if (data) {
					const keys = Object.keys(data);
					const dataBaseList = keys.map((key) => {
						return { ...data[key], uuid: key };
					});
					setList(dataBaseList);
				} else {
					setList([]);
				}
			});
	}, []);

	return (
		<div>
			<Grid item sm={12} xs={12} style={{ margin: 20, marginBottom: 0 }}>
				<Typography gutterBottom variant="h5" component="h2">
					Lista de mensagens
				</Typography>
			</Grid>
			<Grid container style={{ padding: 10 }}>
				{list.map((message, key) => {
					return (
						<Grid item sm={6} xs={12} key={key}>
							<Card variant="outlined" style={{ margin: 10 }}>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										{message.name}
									</Typography>
									<Typography color="textSecondary">
										Assunto: {message.subject}
									</Typography>
									<Typography color="textSecondary">
										Email: {message.email}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										Mensagem: {message.message}
									</Typography>
								</CardContent>
								<CardActions
									style={{ padding: 16, paddingTop: 0 }}
								>
									<Button
										variant="contained"
										color="secondary"
										size="small"
										startIcon={<DeleteIcon />}
										onClick={() => {
											removeMessage(message);
										}}
									>
										Remover
									</Button>
								</CardActions>
							</Card>
						</Grid>
					);
				})}
			</Grid>
			<Grid
				item
				xs={12}
				className="buttonBox"
				style={{ margin: 10, marginTop: 0 }}
			>
				<Link to="/contact">
					<Fab color="primary" aria-label="add">
						<AddIcon />
					</Fab>
				</Link>
			</Grid>
		</div>
	);
}
