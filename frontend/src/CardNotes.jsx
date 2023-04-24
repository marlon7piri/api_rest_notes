import React from "react";
import axios from "axios";
import {API} from "./api";
import { deleteRequest } from "./controllers/notesControlllers";


export default function CardNotes({ setNotes,notes }) {
  const handlerDelete = (id) => {
    try {
      const res = deleteRequest(id)
      setNotes(notes.filter(note=>note.id !== id));
   

    
    } catch (error) {
      console.log(error);
    }
  };
  if(notes.length===0){
    return <h1>No hay notas </h1>
  }

  return (
    <div>
      {notes.map((note) => {
        return (
          <div key={note.id}>
            <div className="lista">
              {" "}
              <li>{note.content}</li>
              <button
                className="boton_clear"
                onClick={() => handlerDelete(note.id)}
              >
                X
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
