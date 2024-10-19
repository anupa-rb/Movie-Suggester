import { Link } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";

const SingleMovie = (props) => {
  return (
    <>
      <Col key={props.data.id}>
        <Card style={{ width: "18rem", minHeight:"770px" }}>
          <Card.Img variant="top" src={props.data.image} alt="Movie image" />
          <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>
              Info: {props.data.info}
              <br />
              Rating: {props.data.rating}
            </Card.Text>
            <Link to={`/view_movie/${props.data.id}`}>
              <Button variant="primary">View Details</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
export default SingleMovie;
