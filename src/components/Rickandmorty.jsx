import axios from "axios";
import React, { useEffect, useState } from "react";

const Rickandmorty = () => {

  const [data, setdata] = useState(null);
  const [alive, setAlive] = useState(false);
  const [living, setLiving] = useState(null);
  const [dead, setDead] = useState(false);
  const [notLiving, setNotLiving] = useState(null);
  const [unknown, setUnknown] = useState(false);
  const [anybodyknows, setAnybodyKnows] = useState(null);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function getData() {
      const url = 'https://rickandmortyapi.com/api/character/?page=5';
      await axios
        .get(url)
        .then((response) => {
          setdata(response.data);
        });
    }
    getData();
  }, []);

  const displayAlive = () => {
    const result = data.results.filter((person) => person.status === "Alive");
    setLiving(result);
    setDead(false);
    setUnknown(false);
  };
  const displayDead = () => {
    const result = data.results.filter((person) => person.status === "Dead");
    setNotLiving(result);
    setAlive(false);
    setUnknown(false);
  };
  const displayUnknown = () => {
    const result = data.results.filter((person) => person.status === "unknown");
    setAnybodyKnows(result);
    setAlive(false);
    setDead(false);
  };

  return (
    <>
      <header>
        <h1>Rick and Morty</h1>
        <div className="header-items">
        <button
          onClick={() => {
            setAlive(!alive);
            displayAlive();
          }}
        >
          Alive
        </button>
        <button
          onClick={() => {
            setDead(!dead);
            displayDead();
          }}
        >
          Dead
        </button>
        <button
          onClick={() => {
            setUnknown(!unknown);
            displayUnknown();
          }}
        >
          Unknown
        </button>
        <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}} />
        </div>
      </header>

      <div className="left">
        {data
          ? data.results.filter((person) => {
            if(searchTerm == ""){
              return person;
            }else if (person.name.toLowerCase().includes(searchTerm.toLowerCase())){
              return person;
            }
            }).map((person, i) => {
              return (
                <div className="card" key={i}>
                  <h2>{person.name}</h2>
                </div>
              );
            })
          : null}
      </div>
      <div className="right">
        {living && alive
          ? living.map((person, i) => {
              return (
                <div className="card" key={i}>
                  <h2>{person.name}</h2>
                </div>
              );
            })
          : null}
        {notLiving && dead
          ? notLiving.map((person, i) => {
              return (
                <div className="card" key={i}>
                  <h2>{person.name}</h2>
                </div>
              );
            })
          : null}
          {anybodyknows && unknown
          ? anybodyknows.map((person, i) => {
              return (
                <div className="card" key={i}>
                  <h2>{person.name}</h2>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Rickandmorty;
