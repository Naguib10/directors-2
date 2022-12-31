import DirectorCard from "./components/DirectorCard";
import CreateForm from "./components/CreateForm";
import CreateMovie from "./components/CreateMovie";
import { Movies } from "./pages/Movies";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";
import { Home } from "./pages/Home";

function App() {

  const [directors, setDirectors] = useState([]);
  const [movies, setMovies] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5000/");
      setDirectors(response.data);

    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    //console.log(directors);
    //fetchData();

  }, [])

  return (
    <div className="App">
      {/* <CreateForm setDirectors={setDirectors} />
      {directors.map((director, id) => {
        return <DirectorCard key={id} name={director.name} dob={director.dob} photo={director.photo} />
      })} */}


      <Routes>
        <Route path="/" element={<Home />}>Home</Route>
        <Route path="/add-d" element={<CreateForm />}>Add Directors</Route>
        <Route path="/add-m" element={<CreateMovie />}>Add Movies</Route>
        <Route path="/movies" element={<Movies />}>Movies</Route>
      </Routes>



    </div>
  );
}

export default App;
