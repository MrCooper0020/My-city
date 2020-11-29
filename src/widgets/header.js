import React, { useLayoutEffect } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	MenuItem,
	IconButton,
	Button,
	Drawer,
} from "@material-ui/core";
import "../styles/header.css";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

export default function Header() {
	const [userLogin, setUserLogin] = React.useState(false);
	const [menuOpen, setMenuOpen] = React.useState(false);

	function verifyLogin() {
		if (sessionStorage.getItem("token-key")) {
			setUserLogin(true);
		} else {
			setUserLogin(false);
		}
	}

	const logout = () => {
		sessionStorage.removeItem("token-key");
		verifyLogin();
		setMenuOpen(false);
	};

	const LoginItem = () => {
		if (userLogin) {
			return (
				<IconButton
					aria-label="Links"
					edge="end"
					color="inherit"
					onClick={() => setMenuOpen(true)}
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
	}, []);

	return (
		<AppBar position="static">
			<Toolbar className="barContent">
				<Typography variant="h6">My city</Typography>
				<div>
					<LoginItem />
					<Drawer
						anchor="right"
						open={menuOpen}
						onClose={() => setMenuOpen(false)}
					>
						<Link to="/">
							<MenuItem onClick={() => setMenuOpen(false)}>
								Home
							</MenuItem>
						</Link>
						<Link to="/list">
							<MenuItem onClick={() => setMenuOpen(false)}>
								Problemas
							</MenuItem>
						</Link>
						<Link to="/messages">
							<MenuItem onClick={() => setMenuOpen(false)}>
								Recados
							</MenuItem>
						</Link>
						<Link to="/login">
							<MenuItem onClick={logout}>Logout</MenuItem>
						</Link>
					</Drawer>
				</div>
			</Toolbar>
		</AppBar>
	);
}
