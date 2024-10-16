import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      if (i === index) {
        deleteUser(character.id);
      }
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person) {
    postUser(person)
      .then((newUser) => {
        if (newUser === undefined) {
          throw new Error("Error: Resource not created.");
        }
        setCharacters([...characters, newUser])})
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });

    return promise;
  }

  function deleteUser(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
