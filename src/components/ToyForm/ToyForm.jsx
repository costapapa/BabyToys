import { useState } from 'react'
import { createToy } from '../../utilities/toys-api'
import { useNavigate } from 'react-router-dom';
import Geocode from '../Geocode/Geocode';
import MapComponent from '../MapComponent/MapComponent'
import { Container, Button } from 'react-bootstrap'

export default function ToyForm({ handleGeoCodeInfo, geocodeInfo }) {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        title: '',
        condition: '',
        img: '',
        location: '',
        lng: '',
        lat: '',
        description: '',
    })
    

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [e.target.name]: e.target.value,
        }));
      };   

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await createToy(formData)
            navigate('/availabletoys') 
        } catch (error) {
            console.log('Error', error)
        }
    }


    return (
        <>
           
                <form className="my-4 d-flex flex-column" onSubmit={handleFormSubmit}>
                    <label>Toy Title</label>
                    <input type="text" name="title" onChange={handleInputChange} />
                    <label>Condition</label>
                    <input type="text" name="condition" onChange={handleInputChange} />
                    <label>Description</label>
                    <input type="text" name="description" onChange={handleInputChange} />
                    <label>Image</label>
                    <input placeholder='Paste URL' type="text" name="img" onChange={handleInputChange} />
                    <label>Location</label>
                    <input type="text" name="location" onChange={handleInputChange} />
                    <button className="align-self-end" style={{maxWidth: "100px"}} type="submit">Upload Toy</button>
                </form>
          
        </>
    )
}


// const toySchema = new Schema( {
//     title: String,
//     date: Date,
//     condition: String,
//     img: String,
//     location: Number,
//     lng: Number,
//     lat: Number,
//     description: String,
// }, {
//    timestamps: true
// })