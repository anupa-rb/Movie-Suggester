import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MovieNavBar from "../Components/MovieNavBar";
import { Container, Button, Form, InputGroup } from "react-bootstrap";

const AddMovie = () => {
  const history = useHistory();

  const movie_name_reference = useRef();
  const rating_reference = useRef();
  const desc_reference = useRef();
  const movieAdding = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: movie_name_reference.current.value,
      rating: rating_reference.current.value,
      description: desc_reference.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData
      );
      alert(response.data.message);
      history.replace("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured. Try again later1!");
      }
    }
  };
  return (
    <>
      <MovieNavBar />
      <br />
      <br />
      <Container>
        <form onSubmit={movieAdding}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Movie Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Movie Name"
              ref={movie_name_reference}
              autoComplete={false}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Rating:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter rating"
              ref={rating_reference}
              autoComplete={false}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={2} ref={desc_reference} />
          </Form.Group>
          <Button variant="dark" type="submit">
            Add Movie
          </Button>{" "}
        </form>
      </Container>
    </>
  );
};
export default AddMovie;
