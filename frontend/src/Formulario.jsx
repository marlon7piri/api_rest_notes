import React, { useState } from "react";
import axios from "axios";
import { API } from "./api";

export default function Formulario({ notes, setNotes }) {
  const [newnote, setNewnote] = useState({
    content: "",
    date: new Date().toISOString,
    important: false,
  });

  const handlerSubmit = (e) => {
    e.preventDefault();

    try {
      axios.post(API, newnote).then((response) => {
        setNotes([...notes, response.data]);
      });
      setNewnote("")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <div>
          <p>Titulo:</p>
          <input
            type="text"
            placeholder="titulo de la nota"
            name=""
            id=""
            onChange={(e) =>
              setNewnote({ ...newnote, content: e.target.value })
            }
           value={newnote.content || ""}/>
        </div>
        <div>
          <button>Crear Nota</button>
        </div>
      </form>
    </div>
  );
}
