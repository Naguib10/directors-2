import React, { useState, useParams, useEffect } from 'react';
import axios from 'axios';

export const SearchResults = (props) => {

    const [director, setDirector] = useState([]);

    //const { director } = useParams();
    async function getResults() {
        const searchpar = await axios.get(`http://localhost:5000/search?name=${props.search}`);
        setDirector(searchpar);
        console.log(searchpar);
        console.log("the props in search results is " + props.search);
    }

    useEffect(() => {
        getResults();
    }, [])


    return (
        <div>
            <p>{props.search}</p>
        </div>
    )
}
