import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

function TextExample(props) {

    const directorName = props.name;

    function showMovies() {
        props.search(directorName);
        console.log("show movies is working");
    }


    return (
        <Col className="col-md-3 text-center">
            <Card onClick={showMovies} >
                <Link to={`/movies/${props.name}`} style={{ textDecoration: 'none' }}>
                    <Card.Body>

                        {/* <img src={props.photo ? `/photos/${props.photo}` : ''} /> */}
                        <Card.Img className="rounded-circle" width="70%" variant="top" src={`/photos/${props.photo}`} alt={props.name} />
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Director</Card.Subtitle>
                        <Card.Text>
                            Born in {props.dob}
                        </Card.Text>

                    </Card.Body>
                </Link>
            </Card >
        </Col>

    );
}

export default TextExample;