import React, { useState, useParams, useEffect } from 'react';
import axios from 'axios';
import DirectorCard from '../components/DirectorCard';

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
            style={{
                display: 'flex',
                alignItems: 'center',

            }}>

            {directors.map((director, id) => (
                <DirectorCard key={id} name={director.name} dob={director.dob} photo={director.photo} id={director._id} />
            ))}
        </div>
    )
}
