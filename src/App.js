import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import Character from "./components/Character";
import Pagination from "./components/Pagination";
import "./App.css"


function App() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const initialUrl = "https://rickandmortyapi.com/api/character";
  const fetchCharacters = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchCharacters(initialUrl);
  }, []);
  const onPrevious = () => {
    fetchCharacters(info.prev);
  };
  const onNext = () => {
    fetchCharacters(info.next);
  };
  return (
    <>
      <Navbar brand="Rick and Morty app - By: Deyvi" />;
      <div className="container mt-1">
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevious}
          onNext={onNext}
        />
        <Character characters={characters} />
        <Pagination prev={info.prev} next={info.next} onPrevious={onPrevious}
          onNext={onNext}/>
      </div>

    </>
  );
}

export default App;
