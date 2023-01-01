
import MovieCard from "../components/MovieCard";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

export const Movies = () => {

    const [movies, setMovies] = useState([]);

    async function fetchData() {
        try {
            const response = await axios.get("http://localhost:5000/movies");
            setMovies(response.data);

        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {

        fetchData();

    }, [])

    function logD() {
        console.log(movies);
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
                        <MovieCard key={id} name={movie.name} dop={movie.dop} director={movie.director} photo={movie.photo} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}
