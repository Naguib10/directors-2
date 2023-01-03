
import MovieCard from "../components/MovieCard";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

export const MoviesAll = (props) => {

    const [movies, setMovies] = useState([]);

    async function fetchData() {
        try {
            const response = await axios.get(`http://localhost:5000/movies`);
            setMovies(response.data);
            //console.log("hello my name is " + props.director);

        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {

        fetchData();

    }, [])

    function removeMovie(movieId) {
        setMovies((prev) =>
            prev.filter((movie) => movie._id != movieId))
    }


    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Row>
                {movies.map((movie, id) => (
                    <Col className="col-md-3" key={id}>
                        <MovieCard key={id} name={movie.name} dop={movie.dop} director={movie.director} photo={movie.photo} id={movie._id} remove={removeMovie} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}
