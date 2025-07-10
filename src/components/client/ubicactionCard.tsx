"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

interface Props {
  lat: number;
  lng: number;
  ubicacion: string;
  nombre: string;
}

const markerIcon = new Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapUbicacion({ lat, lng, ubicacion, nombre }: Props) {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={markerIcon}>
          <Popup>
            <strong>{nombre}</strong>
            <br />
            {ubicacion}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
