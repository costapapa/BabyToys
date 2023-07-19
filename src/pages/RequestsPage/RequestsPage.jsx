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