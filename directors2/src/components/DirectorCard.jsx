import Card from 'react-bootstrap/Card';
import { useState } from 'react';

function TextExample(props) {

    return (

        <Card style={{ width: '18rem' }}>

            <Card.Body>
                {/* <img src={props.photo ? `/photos/${props.photo}` : ''} /> */}
                <Card.Img variant="top" src={`/photos/${props.photo}`} alt={props.name} />
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Director</Card.Subtitle>
                <Card.Text>
                    Born in {props.dob}
                </Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
                <a href='http://localhost:3000/movies' className='stretched-link'></a>
            </Card.Body>

        </Card >

    );
}

export default TextExample;