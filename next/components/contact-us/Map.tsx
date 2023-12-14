import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = ({ markers }) => {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
    // iconAnchor: [10, 41],
  });

  const eventZoom = 13;
  const center = markers[0].geocode;
  const defaultHeight = "80vh";
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
        attribution="basic"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker, index) => (
        <Marker key={index} position={marker.geocode} icon={customIcon}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
