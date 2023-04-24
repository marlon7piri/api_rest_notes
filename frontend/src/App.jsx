import { useEffect, useState } from "react";

import "./App.css";
import Formulario from "./Formulario";
import getNotes from "./api";
import CardNotes from "./CardNotes";

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes().then(response=>{
      setNotes(response);
    });

  }, []);

  return (
    <div className="container">
      <h1 className="titulo">Mi agenda de Notas</h1>
      <Formulario setNotes={setNotes} notes = {notes} />
      <CardNotes notes = {notes} setNotes={setNotes}/>
    </div>
  );
}

export default App;
