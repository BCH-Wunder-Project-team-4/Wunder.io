import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { Icon } from "leaflet";

const Map = ({ markers }) => {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
    popupAnchor: [0, -15],
  });

  const eventZoom = 13;
  const center = markers[0].geocode;
  const defaultHeight = "90vh";
  const eventMapHeight = "400px";

  return (
    <MapContainer
      style={{
        height: markers.length === 1 ? eventMapHeight : defaultHeight,
        zIndex: 1,
      }}
      center={center}
      zoom={markers.length === 1 ? eventZoom : 6}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker, index) => (
        <Marker key={index} position={marker.geocode} icon={customIcon}>
          <Popup>
            <div className="font-overpass text-md">{marker.popUp}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
