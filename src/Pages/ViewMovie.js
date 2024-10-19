import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieNavBar from "../Components/MovieNavBar";
import { Container } from "react-bootstrap";

const ViewMovie = () => {
  const getParams = useParams();
  const getID = getParams.id;

  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    getSingleMovieInfo();
  }, []);

  const getSingleMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      alert("Error occured!");
    }
  };
  return (
    <>
      <MovieNavBar />
      <Container>
        <h2 className="text-info">{movieData.name}</h2>
        <br/>
        Info: {movieData.info}
        <br />
        <br />
        Description: {movieData.desc}
        <br />
        <br />
        Image:
        <br /> <img src={movieData.image} alt="Movieimage" />
        <br />
        <br />
        Rating: {movieData.rating}
      </Container>
    </>
  );
};
export default ViewMovie;
