import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

export default function Home() {

    const [defaultLocation, setDefaultLocation] = useState({
		location: {
			lat: -28.2630184,
			lng: -52.4105743,
		},
		zoom: 12,
	});

    return (
		<div style={{ height: "100vh", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: "AIzaSyDvdkyqaq8Cu2fVp_9EQNNnhMoDmT-GXt4",
				}}
				defaultCenter={defaultLocation.location}
				defaultZoom={defaultLocation.zoom}
			></GoogleMapReact>
		</div>
	);
}