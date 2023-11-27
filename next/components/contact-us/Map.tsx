import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngTuple } from 'leaflet';

const Map = ({markers}) => {

    

    const customIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/128/684/684908.png',
        iconSize: [38, 38],
        // iconAnchor: [10, 41],
    })

  return (
    
  <MapContainer style={{height : '100vh', zIndex:1}} center={[60.165, 24.933]} zoom={5} scrollWheelZoom={false}>
    <TileLayer
      attribution='basic'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* <TileLayer
      attribution='sky color'
      url="https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png"
    /> */}
    
    {
        markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
                <Popup>
                    {marker.popUp}
                </Popup>
            </Marker>
        ))
    }
  </MapContainer>
)
}

export default Map;


