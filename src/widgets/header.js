import React, { useLayoutEffect } from "react";
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
	const [userLogin, setUserLogin] = React.useState(false);

	function verifyLogin() {
		if (sessionStorage.getItem("token-key")) {
			setUserLogin(true);
		} else {
			setUserLogin(false);
		}
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const LoginItem = () => {
		let title = "Logar";
		let onClick = handleClose;
		let link = "/login";

		if (userLogin) {
			title = "Logout";
			link = "/login";
		}

		return (
			<Link to={link}>
				<MenuItem onClick={onClick}>{title}</MenuItem>
			</Link>
		);
	};

	useLayoutEffect(() => {
		verifyLogin();
	}, [userLogin]);

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
						<Link to="/contact">
							<MenuItem onClick={handleClose}>Contato</MenuItem>
						</Link>
						<LoginItem />
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
}
