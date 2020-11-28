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

	const logout = () => {
		sessionStorage.removeItem("token-key");
		verifyLogin();
		handleClose();
	};

	const LoginItem = () => {
		if (userLogin) {
			return (
				<IconButton
					aria-label="Links"
					edge="end"
					color="inherit"
					onClick={handleClick}
				>
					<MoreIcon />
				</IconButton>
			);
		} else {
			return (
				<Link to="/login">
					<Button color="inherit">Login</Button>
				</Link>
			);
		}
	};

	useLayoutEffect(() => {
		verifyLogin();
	}, [setUserLogin]);

	return (
		<AppBar position="static">
			<Toolbar className="barContent">
				<Typography variant="h6">My city</Typography>
				<div>
					<LoginItem />
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
						<Link to="/login">
							<MenuItem onClick={logout}>Logout</MenuItem>
						</Link>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
}
