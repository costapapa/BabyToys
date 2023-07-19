import * as usersAPI from '../../utilities/users-api'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
export default function RequestItem({ request, itemKey, onAcceptRequest, toy }) {
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const otherUserId = request.requestedBy;
            await getOtherUser(otherUserId);
        };

        fetchData();
    }, []);

    async function getOtherUser(otherUserId) {
        const user = await usersAPI.getUserDetails(otherUserId)
        setUserDetails(user)
    }
     
    const requestedAt = new Date(request.createdAt)

    return (
        <>
            <Row>
                <Col>
                    {userDetails && <p>{userDetails.email}</p>}
                </Col>
                <Col>
                <p>{requestedAt.toDateString()}</p>
                </Col>
                <Col>
                    <button onClick={() => onAcceptRequest(toy._id, request.requestedBy)}>Accept Request</button>
                </Col>
            </Row>
        </>
    )
}