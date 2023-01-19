
import DirectorCard from "../components/DirectorCard";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Search from '../components/Search';
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

    function grabSearch(searchDir) {
        props.searchDir(searchDir);
    }

    return (

        <>
            <div className="col-md-4 m-auto">
                <Search search={grabSearch} />
                <br></br>
            </div>
            <div
                className="m-auto"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>

                <Row>
                    {directors.map((director, id) => (
                        <Col className="" key={id}>
                            <DirectorCard key={id} name={director.name} dob={director.dob} photo={director.photo} id={director._id} search={grabDirector} />
                        </Col>

                    ))}
                </Row>
                {/* <button onClick={logD}>log directors</button> */}
            </div>
        </>
    )
}
