import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngTuple } from 'leaflet';

const Map = () => {

    type MarkerType = {
        geocode: LatLngTuple,
        popUp: string,
    }

    const markers: MarkerType[]  = [

        {
            geocode: [60.165, 24.933],
            popUp: 'Helsinki',
        },
        {
            geocode: [60.450, 22.265],
            popUp: 'Turku',
        },
        {
            geocode: [59.420, 24.805],
            popUp: 'Tallin',
        }
        ,
        {
            geocode: [ 57.529, 25.406],
            popUp: 'Valmiera',
        }
        ,
        {
            geocode: [56.949, 24.105],
            popUp: 'Riga',
        }
    ]

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


