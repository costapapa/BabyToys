# BabyToys App

Description:
My final project involved creating a Full Stack Web Application. For this project the requirement was to use React Front-End and Express Back-end. I wanted to create a free Baby Toy collection App. As a new Dad I found we have so many unneeded toys, these toys would be valuable to others as baby’s love new toys, but get bored of them very quickly!

Deployment:
https://babytoysapp-4319c3b1333b.herokuapp.com

https://github.com/costapapa/BabyToys

Timeframe & Working Team:
This was a solo project, we were given just under 7 days to build our app. This included planning, coding the app and deploying it.

Technologies Used:
React front-end, Express Back-End, MongoDB/Mongoose, Node, Bootstrap, Visual Studio Code, Google Maps API, Google Geocode API. Excalidraw, Trello.

Brief:
A working full-stack, single-page application hosted on Heroku.
☐ Incorporate the technologies of the MERN-stack:
MongoDB/Mongoose
Express
React
Node
☐ Have a well-styled interactive front-end.
☐ Communicates with the Express backend via AJAX.
☐ Implement token-based authentication. Including the ability of a user to sign-up, log in & log out.
☐ Implement authorization by restricting CUD data functionality to authenticated users. Also, navigation should respond to the login status of the user.
☐ Have a well-scoped feature-set. Full-CRUD data operations are not required if one or more other features are included, for example:
Consume data from a third-party API.
Implement additional functionality if the user is an admin.
Implementation of a highly dynamic UI or data visualization.

Planning:
Firstly I created a wireframe of what i wanted the App to look like on Excalidraw:
<img width="502" alt="Screenshot 2023-08-09 at 19 41 38" src="https://github.com/costapapa/BabyToys/assets/130251744/1cb2e38a-422a-4ac3-a617-32481c53d974">

Secondly I created some user stories in Trello for the wireframes above, some of these included stretch goals:
User can sign up
User can LogIn
User can Upload a Toy, Description, Location, Title, Condition
User can view other Toys
User can see toys by location (Google Maps)
User can confirm a collection of toy
User can Delete their own Toy
When user uploads a toy Location is Updated on Google Maps
User not able to Delete another users Toy
User can direct message each other
User can search toys by Postcode
User can Edit Toy
User can Comment on Toy

Finally i then created my ERD for the Models:
<img width="562" alt="Screenshot 2023-08-09 at 19 42 47" src="https://github.com/costapapa/BabyToys/assets/130251744/a9d39a7a-6050-4c8a-8caa-8b0007c697cf">

Code Process:
The first step of creating the Web App was to implement user LogIn and SignUp. I also wanted to user the bcrypt to ensure all Passwords are hashed as this is the most secure way to not have Users passwords breached at any point. I created the signUp form and Log in form in the Front End of react:

<img width="518" alt="Screenshot 2023-08-09 at 19 44 36" src="https://github.com/costapapa/BabyToys/assets/130251744/bf85bef0-ac02-43b2-a131-5d8acf8186f9">

<img width="621" alt="Screenshot 2023-08-09 at 19 45 18" src="https://github.com/costapapa/BabyToys/assets/130251744/6b850a05-dbee-4686-9fc0-f6d5b2b48c8d">

Once this was complete i then added the UserModel to Express and added a preSave to the userSchema which would you bcrypt to hash the password:

userSchema.pre('save', async function(next) {
// 'this' is the user doc
if (!this.isModified('password')) return next();
// update the password with the computed hash
this.password = await bcrypt.hash(this.password, 12);
return next();
});

After the SignUp and LogIn functionality was complete my main focus was ensure a user could Upload a toy to show on the /availabletoys page. 

I used a form for this as a Component in react:

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

<img width="619" alt="Screenshot 2023-08-09 at 19 46 15" src="https://github.com/costapapa/BabyToys/assets/130251744/22b21bf9-5a20-46bf-9eee-e7bd8d5f724d">

Once this was fully functioning the available toys page looked like this:
<img width="289" alt="Screenshot 2023-08-09 at 19 46 49" src="https://github.com/costapapa/BabyToys/assets/130251744/d80db1ed-0082-434a-b6e1-273abbcc1889">

As a user could now upload a toy and it would show on the available Toys page, my main focus now would be to work on the google API, when a user would input theie postcode into the Location on the ToyForm i wanted to use the GeoCode API to convert this into a latitude and longitude. A way I decided to implement this was similar to the preSave I used for the bcrypt hashing of the password.

toySchema.pre('save', async function (next) {
if (!this.isModified('location') && !this.isNew) return next();
try {
const client = new Client()
const apiKey = googleKey;
const response = await client.geocode({
params: {
address: this.location,
region: 'uk',
key: apiKey
}
});
const { lat, lng } = response.data.results[0].geometry.location;
const geocodeInfo = { lat, lng };
this.location = `${geocodeInfo.lat}, ${geocodeInfo.lng}`
} catch (error) {
console.log('ERROR', error)
}
return next();
})

Please also see how this is converted in the form using the chrome developer tools.

<img width="618" alt="Screenshot 2023-08-09 at 19 47 34" src="https://github.com/costapapa/BabyToys/assets/130251744/9efbac27-bce7-46dc-8c49-161326e27367">

As this was now working, i could then use it to show the location on the Google Maps view and pass it through there.

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

The app had the main functionality working, I then spent some time adding delete functionality. I  wanted to only allow the user that uploaded the toy to have access to deleting it. 

async function handleDeleteClick(event) {
try {
const toyId = event.target.id;
await deleteToy(toyId);
setToys(prevToys => prevToys.filter(toy => toy._id !== toyId));
} catch (error) {
console.log('Error deleting toy', error);
}
}
function userUpload(toy) {
return toy.toyOwnerId === user._id;
}

<Col xs={2} md={2} className="d-flex flex-column align-items-end">
{userUpload(toy) && (
<div className="mb-0">
<button className="delbtn" id={toy._id} onClick={handleDeleteClick}>
Delete
</button>
</div>
)}

This would also need to be implemented into the back-end to the routes and controllers:

async function deleteOneToy(req, res) {
try {
const deletedToy = await Toy.findByIdAndDelete(req.params.id)
res.json(deletedToy)
} catch (err) {
res.status(400).json(err)
}
}

router.post('/:id', toysCtrl.deleteOneToy)


These were steps I mostly followed throughout the project. Working in the Front-end then implementing the changes to the back-end.

Now that I added the delete functionality I wanted to begin working on the request functionality. When a user clicked the Collect button on the available toys page the requests page. Would notify the owner of the toy that the collection has been requested. On the requests page this would show and also your request sent would show. This was by far the hardest feature I had to implement into my app and took a good 3 days to get my head around. 

I created a few components in React to interact within the requests page, and also used some maps and filters to target the request. The request schema was a subdocument of toy model, this made the request difficult to target as it was an array within an array.  

import { useState, useEffect } from 'react'
import { checkToken } from '../../utilities/users-service'
import { getAll, getRequests, getAllRequests, acceptRequest, requestsMade } from '../../utilities/toys-api'
import ToyItem from '../../components/ToyItem/ToyItem';
import SentRequest from '../../components/SentRequest/SentRequest';
import { Container, Col, Row } from 'react-bootstrap';


function RequestsPage({ user }) {

const [toysWithRequests, setToysWithRequests] = useState([]);
const [yourRequests, setYourRequests] = useState([])

useEffect(() => {
async function getRequests() {
try {
const allToys = await getAll()
// console.log(allToys)
const userId = user._id
// console.log(userId)
const userToys = allToys.filter((toy) => {
return toy.toyOwnerId.toString() === userId.toString()
})
// console.log(userToys)
const userToysWithRequests = userToys.filter((toy) => {
return toy.request.length > 0;
})
// console.log(userToysWithRequests)
setToysWithRequests(userToysWithRequests)
} catch (error) {
console.log('Error retrieving toy requests', error);
}
}
getRequests();
}, [user]);


useEffect(() => {
async function getYourRequests() {
try {
const allToys = await getAll()
const userId = user._id
const userRequestedToys = allToys.filter((toy) => {
console.log(toy)
return toy.request.some((request) => request.requestedBy === userId);


// return toy.request.includes(userId)
//filter out the ID with our user id included in toy
//map over and display it
})
console.log(userRequestedToys)
setYourRequests(userRequestedToys)
console.log(yourRequests)
} catch (error) {
console.log('Error Fetching Your Requests')
}
}
getYourRequests()
}, [])


async function handleAcceptRequest(toyId, requesterId) {
try {
await acceptRequest(toyId, user._id, requesterId);
setToysWithRequests(prevToys => prevToys.filter(toy => toy._id !== toyId));
// console.log(setToysWithRequests)
} catch (error) {
console.log('Error accepting request', error);
}
}

const toyItems = toysWithRequests.map((toy, index) => (
<ToyItem toy={toy} key={index} index={index} onAcceptRequest={handleAcceptRequest} />
));

const userIdRequests = yourRequests.map((toy, index) => (
<SentRequest toy={toy} request={toy.request.find((request) => request.requestedBy === user._id)} key={index} index={index} />
));

return (
<>
<Container>
<Row className="my-3">
<Col className="mx-3">
<h4>Requests for your toys</h4>
{toyItems}
</Col>
<Col className="mx-3">
<h4>Toys you've requested</h4>
{userIdRequests}
</Col>
</Row>
</Container>
</>
)
}

export default RequestsPage

async function requestToy(req, res) {
try {
// console.log(req.params.id)
// console.log(req.user)
const toyToUpdate = await Toy.findOne({ _id: req.params.id })
const userId = req.user._id
const toyToUpdateRequestArr = toyToUpdate.request
await toyToUpdateRequestArr.push({ requestedBy: userId })
await toyToUpdate.save()
// console.log(toyToUpdateRequestArr)
} catch (err) {
res.status(400).json(err)
}
}

router.post('/request/:id', toysCtrl.requestToy)

Below is what the requests page looked like:
<img width="419" alt="Screenshot 2023-08-09 at 19 50 14" src="https://github.com/costapapa/BabyToys/assets/130251744/3aec6eaa-504e-407a-bda3-8939844b486b">

My MVP's were now mostly complete for my project. I spent the last day adding some more user logic and also tidying up the CSS. Please see some screenshots below:
<img width="571" alt="Screenshot 2023-08-09 at 19 50 49" src="https://github.com/costapapa/BabyToys/assets/130251744/31db422c-e576-46ba-9bd6-d922866086b4">

<img width="625" alt="Screenshot 2023-08-09 at 19 51 13" src="https://github.com/costapapa/BabyToys/assets/130251744/571ac5d7-5c5e-4ba9-9938-d267d4eb8339">

Challenges:
My biggest challenge was creating the requests feature, as the the requests model was embedded within the toys model this made it difficult to target and work with. Had I known this from the start I would have created the Request Model on its own. The requests page took 3 days if this was complete sooner I could have worked on other stretch goals like direct messaging. 

Also at the beginning of the project i found it difficult to work in between the back end and front end, it wasn't until I got into the rhythm of working with both getting into a pattern that became more efficient.

Wins:
The wins were definitely getting familiar with React, in the end I found it fun and really easy to use. I am particularly proud of the preSave I used in my toys model, which converts a postcode into a latitude and longitude.

Key Learnings:
I feel more confident using Bootstrap and the React package for this is really helpful and easy to use. I would definitely use it again. 
This is the first time I used Front-End React and Back-End Express to work amongst each other and it did take some time getting used to but it's definitely something I would like to work on more in the future to become more proficient in.

Bugs:
Once a toy collected has been approved, this should remove the Toy from the Available Toy page, ultimately i ran out of time and could not add this last feature in.

Future Improvements:
Collection Feature fully complete as mentioned above. 
Direct Messaging so users can message one another about toy collections.
Google Maps Styling.














