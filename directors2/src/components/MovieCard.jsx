import Card from 'react-bootstrap/Card';
import { useState } from 'react';

function TextExample(props) {

    return (

        <Card style={{ width: '18rem' }}>

            <Card.Body>
                {/* <img src={props.photo ? `/photos/${props.photo}` : ''} /> */}
                <Card.Img variant="top" src={`/photos/${props.photo}`} alt={props.name} />
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.dop}</Card.Subtitle>
                <Card.Text>
                    {/* {props.dop}<br></br> */}
                    Directed by {props.director}
                </Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
                <a href='http://localhost:5000/test' className='stretched-link'></a>
            </Card.Body>

        </Card >

    );
}

export default TextExample;