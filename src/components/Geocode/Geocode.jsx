import { useState } from 'react'
import { Client } from '@googlemaps/google-maps-services-js'

function Geocode({ onGeocodeInfo}){
    const [address, setAddress] = useState('')
    const [geocodeInfo, setGeocodeInfo] = useState(null)

    function handleAddressChange(e) {
        setAddress(e.target.value)
    }

    async function handleGeocode(){
        const client = new Client({})
        try {
            const apiKey = ''
            const res = await client.geocode({
                params: {
                    address: address,
                    region: 'uk',
                    key: apiKey
                }
            })
            const { lat, lng } = res.data.results[0].geometry.location;
            setGeocodeInfo({ lat, lng })
            onGeocodeInfo({ lat, lng })   
        } catch (error){
            console.error('Error fetching geocode info', error)
        }
    }
    
    
    return(
        <div>
            <label>Enter Postcode</label>
            <input type="text" value={address} onChange={handleAddressChange} />
            <button onClick={handleGeocode}>Geocode</button>   
        </div>

    )
}

export default Geocode