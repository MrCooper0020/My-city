import React, { useLayoutEffect } from "react";
import Firebase from "../services/firebase-connect";
import {
	Grid,
	Typography,
	CardContent,
	Card,
	Button,
	CardActions,
	Chip,
	Fab,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

export default function ListProblems() {
	const [list, setList] = React.useState([]);

	const Ticket = (props) => {
		if (props.type === 1) {
			return <Chip size="small" label="Baixo" />;
		} else if (props.type === 2) {
			return <Chip size="small" label="Medio" />;
		} else if (props.type === 3) {
			return <Chip color="secondary" size="small" label="Grave" />;
		}
	};

	const removeProblem = (problem) => {
		Firebase.database().ref(`/Problems/${problem.uuid}`).remove();
		console.log(problem);
	};

	useLayoutEffect(() => {
		Firebase.database()
			.ref("Problems")
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
					Lista de problemas
				</Typography>
			</Grid>
			<Grid container style={{ padding: 10 }}>
				{list.map((problem, key) => {
					return (
						<Grid item sm={6} xs={12} key={key}>
							<Card variant="outlined" style={{ margin: 10 }}>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										{problem.name}
									</Typography>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										<Ticket type={problem.importance} />
									</Typography>
									<Typography
										variant="h5"
										component="h2"
									></Typography>
									<Typography color="textSecondary">
										Local: {problem.description}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										Descricao: {problem.description}
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
											removeProblem(problem);
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
				<Link to="/add">
					<Fab color="primary" aria-label="add">
						<AddIcon />
					</Fab>
				</Link>
			</Grid>
		</div>
	);
}
