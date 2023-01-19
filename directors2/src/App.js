import DirectorCard from "./components/DirectorCard";
import CreateForm from "./components/CreateForm";
import CreateMovie from "./components/CreateMovie";
import { Movies } from "./pages/Movies";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";
import { Home } from "./pages/Home";
import Nav from "./components/Nav";
import { MoviesAll } from "./pages/MoviesAll";
import { SearchResults } from "./pages/SearchResults";
import Search from "./components/Search";

function App() {

  const [directors, setDirectors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchDir, setSearchDir] = useState("");

  const [chosenDirector, setChosenDirector] = useState("");

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


  function showMovies(incomingDirector) {
    setChosenDirector(incomingDirector);
  }

  function searchDirector(typedDir) {
    setSearchDir(typedDir);
    console.log(searchDir);
  }

  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path="/" element={<Home search={showMovies} searchDir={searchDirector} />}>Home</Route>
        <Route path="/add-d" element={<CreateForm setDirectors={setDirectors} />}>Add Directors</Route>
        <Route path="/add-m" element={<CreateMovie directors={directors} />}>Add Movies</Route>
        <Route path="/movies" element={<MoviesAll directors={directors} />}>Movies</Route>
        <Route path="/movies/:name" element={<Movies directors={directors} director={chosenDirector} />}>Movies</Route>
        <Route path="/searchresults" element={<SearchResults search={searchDir} />}>Search Results</Route>
        <Route path="/search" element={<Search search={searchDirector} />}>Search</Route>
      </Routes>



    </div>
  );
}

export default App;
