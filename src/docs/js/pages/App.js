import React ,{useState,createContext} from "react";
import { DndProvider } from 'react-dnd'
import Plane from '../components/Plane';
import Backend from "react-dnd-html5-backend";
// import {dragImgItm} from '../components/ImgItem';
export const dragImgItm = createContext(false);

function App() {

  const [value,setValue]=useState(false)
  return (
    <DndProvider backend={Backend}>
    <dragImgItm.Provider value={{value,setValue}}>
          <Plane/>
    </dragImgItm.Provider>
    </DndProvider>
  );
}

export default App;