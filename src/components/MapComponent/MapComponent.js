import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-routing-machine";

const MapComponent = () => {

	const startLat = 51.65626386577985;
	const startLon = 39.20332473597286;

	const coords = [startLat, startLon];

	return (
		<MapContainer center={coords} zoom={8} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

		</MapContainer>
	);
}

export default MapComponent;