import { useState } from 'react'
import Geocode from '../../components/Geocode/Geocode'
import MapComponent from '../../components/MapComponent/MapComponent'
import { Container } from 'react-bootstrap'


function NewOrderPage() {
   const [geocodeInfo, setGeocodeInfo] = useState(null)

   const handleGeoCodeInfo = (info) => {
    setGeocodeInfo(info)
   }
  
   

 return (
   <>
    <h1>Toys Map</h1>
    
    <MapComponent geocodeInfo={geocodeInfo} />
    
   </>
 )
}

export default NewOrderPage

