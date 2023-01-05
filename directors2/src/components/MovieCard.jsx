import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from 'axios';
import EditMovie from "../components/EditMovie";

function TextExample(props) {

    function logD() {
        console.log("is pressed");
    }

    async function deleteMovie() {
        const test = axios.delete(`http://localhost:5000/movies/${props.id}`);
        props.remove(props.id);
    }

    return (

        <Card style={{ width: '18rem' }}>

            <Card.Body>
                <div>
                    <Card.Img variant="top" src={`/photos/${props.photo}`} alt={props.name} />
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.dop}</Card.Subtitle>
                    <Card.Text>
                        Directed by {props.director}
                    </Card.Text>
                    {/* <a href='http://localhost:5000/test' className='stretched-link'></a> */}
                </div>
            </Card.Body>

            {/* <button className='btn btn-outline-primary btn-sm float-start' onClick={logD}>Edit</button> */}
            <EditMovie director={props.director} movie={props.name} year={props.dop} photo={props.photo} directors={props.directors} id={props.id} />
            <button className='btn btn-outline-danger btn-sm float-end' onClick={deleteMovie}>Delete</button>
        </Card >

    );
}

export default TextExample;