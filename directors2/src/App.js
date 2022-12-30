import DirectorCard from "./components/DirectorCard";
import CreateForm from "./components/CreateForm";
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
      {/* <img src='/photos/1672418198829.jpg' /> */}
      <CreateForm setDirectors={setDirectors} />
      {directors.map((director, id) => {
        return <DirectorCard key={id} name={director.name} dob={director.dob} photo={director.photo} />
      })}
    </div>
  );
}

export default App;
