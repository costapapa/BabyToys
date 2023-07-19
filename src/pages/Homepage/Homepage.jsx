import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


export default function HomePage() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="mt-5" onClick={handleShow}>
          App Information
        </button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Baby Toy App</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
Welcome to our toy sharing app! Our platform allows users to upload their toys, which are then showcased on the available toys page. You can browse through a wide variety of toys uploaded by our community members.

To make it even easier for you to find the toys you're interested in, we offer a Toy Map page. Simply click on the map to see the locations of different toys. This way, you can easily find toys near you or in specific areas of interest.

When you find a toy you'd like to collect, simply click the "Collect" button. The owner of the toy will be notified and they will reach out to you via email to coordinate the collection. It's a convenient way to connect with toy owners and arrange for hassle-free collection.

Whether you're looking to share your own toys or discover new ones, our app provides a seamless experience for toy enthusiasts. Join our community and start exploring the exciting world of toy sharing today!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
        
        </>
    );
}


