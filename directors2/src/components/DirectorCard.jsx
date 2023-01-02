import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function TextExample(props) {

    const directorName = props.name;

    function showMovies() {
        props.search(directorName);
        console.log("show movies is working");
    }


    return (

        <Card onClick={showMovies} style={{ width: '18rem' }}>

            <Card.Body>
                <Link to={`/movies/${props.name}`} style={{ textDecoration: 'none' }}>
                    {/* <img src={props.photo ? `/photos/${props.photo}` : ''} /> */}
                    <Card.Img variant="top" src={`/photos/${props.photo}`} alt={props.name} />
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Director</Card.Subtitle>
                    <Card.Text>
                        Born in {props.dob}
                    </Card.Text>
                </Link>
            </Card.Body>

        </Card >

    );
}

export default TextExample;