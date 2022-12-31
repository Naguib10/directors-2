
import DirectorCard from "../components/DirectorCard";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";

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
        <div>
            {directors.map((director, id) => {
                return <DirectorCard key={id} name={director.name} dob={director.dob} photo={director.photo} />
            })}

            <button onClick={logD}>log directors</button>
        </div>
    )
}
