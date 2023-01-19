import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup, Row } from 'react-bootstrap';
import axios from 'axios';
import react, { useState } from 'react';
import { Link } from 'react-router-dom';

function BasicExample(props) {

    const [director, setDirector] = useState({ title: "" });

    function handleChange(event) {
        const { name, value } = event.target;
        setDirector(prevName => {
            return {
                ...prevName,
                [name]: value
            }
        })
    }

    function searchResults() {
        props.search(director.title);
    }


    return (
        <InputGroup>
            <Form.Control type="text" name='title' onChange={handleChange} value={director.title} placeholder="Search for directors" />
            <Link to="/searchresults">
                <Button variant="primary" type="submit" onClick={searchResults}>
                    Search
                </Button>
            </Link>
        </InputGroup>
    );
}

export default BasicExample;