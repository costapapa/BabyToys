import { useState } from 'react'
import ToyForm from '../../components/ToyForm/ToyForm'
import { Container } from 'react-bootstrap'


function UploadToyPage() {
   
  
   

 return (
   <>
   <Container>
    <h1 className="my-3">Upload a Toy</h1>
        <div>
            <ToyForm />
        </div>
   </Container>
   </>
 )
}

export default UploadToyPage