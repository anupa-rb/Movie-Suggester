import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import MovieNavBar from "../Components/MovieNavBar";
import { Form, Button, Container, Modal } from "react-bootstrap";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const [modalShown, setModalShown] = useState(false);
  const [modalText, setModalText] = useState("");

  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData
      );

      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccessToken);
      if (response.data.status === "success") {
        setModalShown(true);
        setModalText("Logged in successfully!");
      }
      //   alert(response.data.message);
      setTimeout(() => {
        history.replace("/");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setModalShown(true);
        setModalText(error.response.data.errors[0].message);
      } else {
        setModalShown(true);
        setModalText("Unknown error occured. Try again later1!");
      }
    }
  };
  return (
    <>
      <MovieNavBar />
      <br />
      <h3>Login Screen</h3>
      <br />
      <Container>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={email}
            autoComplete={false}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            ref={password}
            autoComplete={false}
          />
        </Form.Group>
        <form onSubmit={loginHandler}>
          <Button variant="dark" type="submit">
            Login
          </Button>
        </form>
      </Container>
      <Modal
        show={modalShown}
        onHide={() => {
          setModalShown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShown(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Login;
