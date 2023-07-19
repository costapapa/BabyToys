import { Col, Row } from "react-bootstrap"

export default function SentRequest({ toy, request, user }) {

  const toyCreatedAt = new Date(toy.createdAt)



  return (
    <>
      <Row className="my-3 border rounded py-3 ">

        <Col><p>{toy.title}</p></Col>
        <Col><p>{toyCreatedAt.toDateString()}</p></Col>
        <Col>
          <button>Awaiting Approval</button>
        </Col>
      </Row>
    </>
  )

}