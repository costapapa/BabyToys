import { GoogleMap, LoadScript, Marker, } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { getAll } from '../../utilities/toys-api';
import { Link } from 'react-router-dom'
import './MapComponent.css'




const containerStyle = {
  width: '800px',
  height: '500px'
};

const center = {
  lat: 51.5242389,
  lng: -0.0952041
};



function MapComponent({ geocodeInfo }) {
  const [toys, setToys] = useState([])
  const apiKey = process.env.REACT_APP_GOOGLEKEY;



  useEffect(function () {
    //use effect GETAll()
    async function getToys() {
      const toys = await getAll()
      setToys(toys)
      console.log(toys)
    }
    getToys()
  }, [])

  function parseLatLng(location) {
    const [lat, lng] = location.split(',').map(parseFloat);
    if (isNaN(lat) || isNaN(lng)) {
      return null; 
    }
    return { lat, lng };
  }

 


  return (
    <LoadScript
      googleMapsApiKey={apiKey}
    >
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {toys.map((toy) => (
          <Marker
          key={toy._id}
          position={parseLatLng(toy.location)}
          icon={{
            url: `${toy.img}`,
            scaledSize: new window.google.maps.Size(60, 60),
            anchor: new window.google.maps.Point(20, 20),
          }}
          className="marker-icon"
         />
        ))}
      </GoogleMap>
    </LoadScript>
    
  )
}

  export default MapComponent;
  