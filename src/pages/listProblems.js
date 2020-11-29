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
import CheckIcon from "@material-ui/icons/Check";
import { Link } from "react-router-dom";
import "../styles/list.css";

export default function ListProblems() {
	const [list, setList] = React.useState([]);

	const Ticket = (props) => {
		if (props.type === 1) {
			return <Chip size="small" className="warningLow" label="Baixo" />;
		} else if (props.type === 2) {
			return (
				<Chip size="small" className="warningMedium" label="Medio" />
			);
		} else if (props.type === 3) {
			return <Chip size="small" className="error" label="Grave" />;
		}
	};

	const TicketStats = (props) => {
		if (props.type) {
			return <Chip size="small" className="success" label="Concluido" />;
		} else {
			return (
				<Chip size="small" className="warningLow" label="Pendente" />
			);
		}
	};

	const removeProblem = (problem) => {
		Firebase.database().ref(`/Problems/${problem.uuid}`).remove();
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
										<TicketStats type={problem.isComplete} />
									</Typography>
									<Typography color="textSecondary">
										Tipo: {(problem.isRepair) ? "Manutencao" : "Adicao"}
									</Typography>
									<Typography color="textSecondary">
										Local: {problem.local}
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
										color="primary"
										size="small"
										startIcon={<CheckIcon />}
										className="success"
									>
										Resolvido
									</Button>
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
