import React, { useState, useParams, useEffect } from 'react';
import axios from 'axios';
import DirectorCard from '../components/DirectorCard';
import { Row, Col } from "react-bootstrap";

export const SearchResults = (props) => {

    const [directors, setDirectors] = useState([]);

    //const { director } = useParams();
    async function getResults() {
        const searchpar = await axios.get(`http://localhost:5000/search?name=${props.search}`);
        setDirectors(searchpar.data);
    }

    useEffect(() => {
        getResults();
    }, [])


    return (
        <div
            className="container m-auto"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'

            }}>
            <Row>

                {directors.map((director, id) => (
                    <Col>
                        <DirectorCard key={id} name={director.name} dob={director.dob} photo={director.photo} id={director._id} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}
