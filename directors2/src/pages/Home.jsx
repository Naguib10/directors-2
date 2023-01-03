
import DirectorCard from "../components/DirectorCard";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';

export const Home = (props) => {

    const [directors, setDirectors] = useState([]);


    async function fetchData() {
        try {
            const response = await axios.get("http://localhost:5000/");
            setDirectors(response.data);

        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {

        fetchData();

    }, [])


    function grabDirector(director) {
        props.search(director);
    }

    return (

        <div
            style={{
                display: 'flex',
                alignItems: 'center',

            }}>


            <Row>
                {directors.map((director, id) => (

                    <DirectorCard key={id} name={director.name} dob={director.dob} photo={director.photo} id={director._id} search={grabDirector} />


                ))}
            </Row>
            {/* <button onClick={logD}>log directors</button> */}
        </div>
    )
}
