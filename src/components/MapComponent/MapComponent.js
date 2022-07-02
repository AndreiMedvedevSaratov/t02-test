import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import { useRef } from "react";
import L from "leaflet";
import { useSelector } from "react-redux";

const MapComponent = () => {

	const startLat = 51.605375;
	const startLon = 45.980403;

	const location = useSelector((state) => state.mapComponent);
	const control = useRef(L.Routing.control({
		waypoints: [],
		routeWhileDragging: true
	}));

	console.log(location)

	const startPointLat = (location?.startPoint.length > 0) ? location.startPoint[0] : startLat;
	const startPointLon = (location?.startPoint.length > 0) ? location.startPoint[1] : startLon;

	const destinationPointLat = (location?.destinationPoint.length > 0) ? location.destinationPoint[0] : startLat;
	const destinationPointLon = (location?.destinationPoint.length > 0) ? location.destinationPoint[1] : startLon;

	const zoomLat = (startPointLat + destinationPointLat) / 2;
	const zoomLng = (startPointLon + destinationPointLon) / 2;

	const coords = [zoomLat, zoomLng];

	console.log(coords)

	function SetZoom({ coords }) {
		const map = useMap();

		map.setView(coords, map.getZoom());

		if (location.startPoint.length > 0 && location.destinationPoint.length > 0) {
			control.current
				.setWaypoints([L.latLng(startPointLat, startPointLon),
					L.latLng(destinationPointLat, destinationPointLon)])
				.addTo(map);
		}

		return null;
	}
	
	return (
		<MapContainer center={coords} zoom={8} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<Marker position={[startPointLat, startPointLon]} />
			<Marker position={[destinationPointLat, destinationPointLon]} />
			<SetZoom coords={coords} />

		</MapContainer>
	);
}

export default MapComponent;