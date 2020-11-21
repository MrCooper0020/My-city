import React from "react";
import { Tabs, Tab, Grid } from "@material-ui/core";

export default function Home() {
	return (
		<div>
			<Grid item xs={12} sm={4}>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={0}
					aria-label="Vertical tabs example"
				>
					<Tab label="Problemas" />
					<Tab label="Cadastro de novos problemas" />
				</Tabs>
			</Grid>
			<Grid item xs={12} sm={8}></Grid>
		</div>
	);
}
