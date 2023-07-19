import { useState, useEffect } from 'react';
import { getAll, createToy, deleteToy, requestToy } from '../../utilities/toys-api';
import { Row, Button, Col, Image, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AvailableToys.css';

function AvailableToys({ user }) {
  const navigate = useNavigate();
  const [toys, setToys] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function getToys() {
      try {
        const toys = await getAll();
        setToys(toys);
      } catch (error) {
        console.log('Error retrieving toys', error);
      }
    }
    getToys();
  }, []);

  async function handleFormSubmit(formData) {
    try {
      const createdToy = await createToy(formData);
      setToys(prevToys => [...prevToys, createdToy]);
    } catch (error) {
      console.log('Error creating toy', error);
    }
  }

  async function handleDeleteClick(event) {
    try {
      const toyId = event.target.id;
      await deleteToy(toyId);
      setToys(prevToys => prevToys.filter(toy => toy._id !== toyId));
    } catch (error) {
      console.log('Error deleting toy', error);
    }
  }

async function handleCollectClick(toyId) {
  try {
    setToys(prevToys => prevToys.filter(toy => toy._id !== toyId));
    setRequests(prevRequests => [...prevRequests, toyId]);
    await requestToy(toyId);
  } catch (error) {
    console.log('Error requesting toy', error);
  }
}

  function userUpload(toy) {
    return toy.toyOwnerId === user._id;
  }

  function hasRequested(toy) {
    return toy.request.some(request => request.requestedBy === user._id);
  }

  return (
    <>
      <Container className="mt-5 p-3" style={{ backgroundColor: 'white' }}>
          {toys.map(toy => (
            <Row key={toy._id} className="d-flex align-items-center border rounded mb-3 py-3">
              <Col xs={2} md={2}>
                <Image src={toy.img} alt="toy" thumbnail />
              </Col>
              <Col>
                <div className="ml-3">
                  <h3 className="text-capitalize font-weight-light fs-5">{toy.title}</h3>
                  <p>Condition: {toy.condition}</p>
                  <p>Description: {toy.description}</p>
                </div>
              </Col>
              <Col xs={2} md={2} className="d-flex flex-column align-items-end">
                {userUpload(toy) && (
                  <div className="mb-0">
                    <button className="delbtn" id={toy._id} onClick={handleDeleteClick}>
                      Delete
                    </button>
                  </div>
                )}
                {!hasRequested(toy) && !userUpload(toy) && (
                  <div className="button-container d-flex flex-column">
                    <button className="colbtn" onClick={() => handleCollectClick(toy._id)}>
                      Collect
                    </button>
                  </div>
                )}
                {hasRequested(toy) && (
                  <div className="button-container d-flex flex-column">
                    <button className="colbtn" disabled>
                      Already Requested
                    </button>
                  </div>
                )}
              </Col>
       
            </Row>
          ))}
          </Container>
    </>
  );
}

export default AvailableToys;

