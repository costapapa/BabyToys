import RequestItem from "../RequestItem/RequestItem";
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as usersAPI from '../../utilities/users-api';

export default function ToyItem({ toy, itemKey, onAcceptRequest }) {
  const [userDetails, setUserDetails] = useState(null);
  const [acceptedRequest, setAcceptedRequest] = useState(null);

  const requestsOnToy = toy.request;
  const approvedRequest = requestsOnToy.find(request => request.approved);
  console.log(approvedRequest);

  useEffect(() => {
    if (approvedRequest) {
      const fetchData = async () => {
        const otherUserId = approvedRequest.requestedBy;
        await getOtherUser(otherUserId);
      };

      fetchData();
      setAcceptedRequest(approvedRequest); 
    }
  }, [approvedRequest]);

  async function getOtherUser(otherUserId) {
    const user = await usersAPI.getUserDetails(otherUserId);
    setUserDetails(user);
  }

  return (
    <>
      <Row className="border rounded py-3 my-3">
        <Col>
          <h5>Toy: <strong>{toy.title}</strong></h5>
          {acceptedRequest ? ( 
            <>
              <Row>
                <Col>
                  {userDetails && <p>{userDetails.email}</p>}
                </Col>
                <Col>
                  <p>Will collect your toy</p>
                </Col>
                <Col>
                  <button>Mark as Collected</button> 
                </Col>
              </Row>
            </>
          ) : (
            <>
              <h5>Requests:</h5>
              {requestsOnToy.map((request, index) => (
                <RequestItem
                  key={index}
                  itemKey={index}
                  request={request}
                  onAcceptRequest={onAcceptRequest}
                  toy={toy}
                />
              ))}
            </>
          )}
        </Col>
      </Row>
    </>
  );
}




