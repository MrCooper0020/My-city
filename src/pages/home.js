import React, { useState, useLayoutEffect } from "react";
import GoogleMapReact from "google-map-react";
import BuildIcon from "@material-ui/icons/Build";
import ReportIcon from "@material-ui/icons/Report";
import "../styles/iconTheme.css";
import Firebase from "../services/firebase-connect";

export default function Home() {

    const [defaultLocation, setDefaultLocation] = useState({
		location: {
			lat: -28.2630184,
			lng: -52.4105743,
		},
		zoom: 12,
	});
	const [markers, setMarkers] = React.useState([]);

	const Marker = (props) => {
		let markerTheme;

		if (props.complete) {
			markerTheme = "iconGreen";
		} else {
			markerTheme = "iconYellow";
		}

		return (
			<div>
				{props.repair ? (
					<BuildIcon className={markerTheme} />
				) : (
					<ReportIcon className={markerTheme} />
				)}
				<div>{props.text}</div>
			</div>
		);
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
					setMarkers(dataBaseList);
				} else {
					setMarkers([]);
				}
			});

		console.log(markers);
	}, []);

    return (
		<div style={{ height: "100vh", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: "AIzaSyDvdkyqaq8Cu2fVp_9EQNNnhMoDmT-GXt4",
				}}
				defaultCenter={defaultLocation.location}
				defaultZoom={defaultLocation.zoom}
			>
				{markers.map((marker, key) => {
					return (
						<Marker
							lat={marker.lat}
							lng={marker.lng}
							text={marker.name}
							complete={marker.isComplete}
							key={key}
							repair={marker.isRepair}
						/>
					);
				})}
			</GoogleMapReact>
		</div>
	);
}