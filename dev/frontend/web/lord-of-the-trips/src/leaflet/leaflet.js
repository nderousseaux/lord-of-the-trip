import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// https://leafletjs.com/
// https://react-leaflet.js.org/

L.Icon.Default.imagePath='leafletImages/'

const Leaflet = () => {

  return <div>
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '100wh' }}>
      <TileLayer
        url="https://www.encyclopedie-hp.org/wp-content/uploads/sites/4/2014/07/poudlard-valentin.jpg"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  </div>
}

export default Leaflet;
