import DirectorCard from "./components/DirectorCard";
import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import axios from "axios";

function App() {

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
    console.log("directors");
    fetchData();

  }, [])

  return (
    <div className="App">
      {directors.map((director, id) => {
        return <DirectorCard key={id} name={director.name} dob={director.dob} />
      })}
    </div>
  );
}

export default App;
