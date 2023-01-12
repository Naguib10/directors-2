
import MovieCard from "../components/MovieCard";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useLocation, useParams } from 'react-router-dom';


export const Movies = (props) => {

    const [movies, setMovies] = useState([]);

    //const chosenDirector = props.director; //used before, changed to url because using props would stop after refreshing the page
    //const pickDirector = useLocation().pathname.split('/')[2] // used before, then got a recommendation to use useParams
    const { name } = useParams();

    async function fetchData() {
        try {

            const response = await axios.get(`http://localhost:5000/movies/${name}`);
            setMovies(response.data);

        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    function removeMovie(movieId) {
        setMovies((prev) => prev.filter((movie) => movie._id != movieId))
    }

    async function editMovie() {
        await fetchData();
    }

    return (


        <div
            className="container"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Row>
                {movies.map((movie, id) => (
                    <Col className="" key={id}>
                        <MovieCard key={id} name={movie.name} dop={movie.dop} director={movie.director}
                            photo={movie.photo} id={movie._id} remove={removeMovie} directors={props.directors} edit={editMovie} />
                    </Col>
                ))}
            </Row>
        </div>

    )
}
