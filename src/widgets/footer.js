import React from "react";
import "../styles/footer.css";
import { Grid } from "@material-ui/core";

export default function Footer() {
	return (
		<div className="footerBar">
			<Grid container>
				<Grid item xs={12} sm={12}>
					Desenvolvido por: Matheus H. Potrich
				</Grid>
				<Grid item xs={12} sm={12}>
					Email: 1117956@imed.edu.br
				</Grid>
			</Grid>
		</div>
	);
}
