import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieNavBar from "../Components/MovieNavBar";
import SingleMovie from "../Components/SingleMovie";
import { Row, Form, Container } from "react-bootstrap";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovieText, setSearchMovieText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState("");
  const [errorText, seterrorText] = useState([]);
  const [isError, setIserror] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      const fetchTimer = setTimeout(() => {
        if (searchMovieText && searchMovieText.length > 2) {
          fetchMovies();
        } else if (searchMovieText.length < 1) {
          fetchMovies();
        } else {
          setSearchErrorText(
            "Please enter at least 3 characters for searching."
          );
        }
      }, 2000);

      //cleanup function
      return () => {
        clearTimeout(fetchTimer); //debouncer
      };
    }
  }, [searchMovieText]);

  const fetchMovies = async () => {
    setLoading(true);
    setSearchErrorText("");
    //Fetch resource...

    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      ); //web sanga communicate garera response taanxa

      setMovies(response.data.moviesData);
      setIserror(false);
      setLoading(false);
      setFirstRun(false);
    } catch (error) {
      setIserror(true);
      seterrorText("Cannot get movie info!");
      setLoading(false);
      setFirstRun(false);
    }
    console.log(movies);

    //Promise use garera synchronous banauna
    // const promise = new Promise((resolve, reject) =>{
    //   const response = axios.get(
    //     "https://api.dynoacademy.com/test-api/v1/movies"
    //   ); //web sanga communicate garera response taanxa
    //   resolve(response);
    // });

    // promise.then((result) =>{
    //   console.log(result);
    //   console.log("Finished");
    // }).catch((error)=>{});
  };
  return (
    <div className="App">
      <MovieNavBar />
      <br />
      <div>
        <Container>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Type Movie title"
              value={searchMovieText}
              onChange={(e) => setSearchMovieText(e.target.value)}
              autoComplete={false}
            />
          </Form.Group>
          <span style={{ color: "red" }}>{searchErrorText}</span>
          <br />
        </Container>
      </div>

      {isError ? (
        <>
          <div style={{ background: "red", color: "#ff", padding: "10px" }}>
            {errorText}
          </div>
        </>
      ) : (
        <>
          <div
            style={{ background: "#e7e7e7", padding: "10px", margin: "0px" }}
          >
            <div>{loading ? <>Loading</> : <></>}</div>
            {!loading && movies.length < 1 ? (
              <>No Movies Found</>
            ) : (
              <>
                {" "}
                <Row>
                  {movies.map((el) => (
                    <SingleMovie data={el} />
                  ))}
                </Row>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Index;
