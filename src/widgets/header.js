import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Menu,
	MenuItem,
	IconButton,
	Button,
} from "@material-ui/core";
import "../styles/header.css";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

export default function Header() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="static">
			<Toolbar className="barContent">
				<Typography variant="h6">My city</Typography>
				<div>
					<IconButton
						aria-label="display more actions"
						edge="end"
						color="inherit"
						onClick={handleClick}
					>
						<MoreIcon />
					</IconButton>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<Link to="/">
							<MenuItem onClick={handleClose}>Home</MenuItem>
						</Link>
						<Link to="/add">
							<MenuItem onClick={handleClose}>
								
								Novo Problema
							
							</MenuItem>
						</Link>
						<Link to="/list">
							<MenuItem onClick={handleClose}>Problemas</MenuItem>
						</Link>
						<Link to="/login">
							<MenuItem onClick={handleClose}>Logar</MenuItem>
						</Link>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
}
