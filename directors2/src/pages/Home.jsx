
import DirectorCard from "../components/DirectorCard";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

export const Home = () => {

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

    function logD() {
        console.log(directors);
    }


    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Row>
                {directors.map((director, id) => {
                    return <DirectorCard key={id} name={director.name} dob={director.dob} photo={director.photo} />
                })}
            </Row>
            <button onClick={logD}>log directors</button>
        </div>
    )
}
