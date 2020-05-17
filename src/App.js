import React from "react";
import "./App.css";
import Plane from './components/Plane';
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";


function App() {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <Plane/>
      </DndProvider>
    </div>
  );
}

export default App;
