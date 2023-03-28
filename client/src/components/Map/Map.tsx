import styles from "./Map.module.scss";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { Location } from "../../App";
import { useState } from "react";
import SelectMarkers from "../SelectMarkers/SelectMarkers";

type MapProps = {
  locations: Location[];
};

export default function Map({ locations }: MapProps) {

  const [markerCount, setMarkerCount] = useState(20)
  const positions: [number, number][] = locations.slice(0, markerCount).map((location) => [Number(location.latitude), Number(location.longitude)]);

  return (
    <div className={styles.map_container}>
      <SelectMarkers setMarkerCount={setMarkerCount} locations={locations} />
      <MapContainer
        style={{ minHeight: "500px", height: "100%" }}
        center={[35, 25]}
        zoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.slice(0, markerCount).map((location) => (
          <Marker key={location.id} position={[Number(location.latitude), Number(location.longitude)]}>
            <Popup>
              <h4>Name: {location.name}</h4>
              <span>ID: {location.id}</span><br />
              <span>Latitude: {location.latitude}</span><br />
              <span>Longitude: {location.longitude}</span>
            </Popup>
          </Marker>
        ))}

        <Polyline key={Math.random()} color={'#1E90FF'} weight={1} positions={positions} />
      </MapContainer>
    </div>
  );
}
