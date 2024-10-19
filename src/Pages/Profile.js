import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import MovieNavBar from "../Components/MovieNavBar";
import { Button, Modal } from "react-bootstrap";
import { Container } from "react-bootstrap";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [modalShown, setModalShown] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured. Try again later1!");
      }
    }
  };

  const onLogout = () => {
    setModalShown(true);
  };
  return (
    <>
      <MovieNavBar />
      <Container>
        <br />
        Name: {userData.name}
        <br />
        Email: {userData.email}
        <br />
        Country: {userData.country}
        <br />
        <br />
        <Button variant="danger" onClick={onLogout} type="button">
          Logout
        </Button>
      </Container>
      <Modal
        show={modalShown}
        onHide={() => {
          setModalShown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure you want to Logout?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShown(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("accessToken");
              history.replace("/");
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;
