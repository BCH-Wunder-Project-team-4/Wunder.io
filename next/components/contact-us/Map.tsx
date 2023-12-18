import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngTuple } from 'leaflet';

const Map = ({markers}) => {

    

    const customIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/128/149/149060.png',
        iconSize: [38, 38],
        // iconAnchor: [10, 41],
    })

  return (
    
  <MapContainer style={{height : '50vh', zIndex:1}} center={[58.52, 24.40]} zoom={4} scrollWheelZoom={false}>
    <TileLayer
      attribution='basic'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
        markers.map((marker, index) => (
              <Marker key={index} position={marker.geocode} icon={customIcon}>
                <Popup className=' font-bold m-2'>
                    {marker.popUp}
                </Popup>
            </Marker>
        ))
    }
  </MapContainer>
)
}

export default Map;


