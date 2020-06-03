import React ,{useState,createContext} from "react";
// import { DndProvider } from 'react-dnd'
import Plane from '../components/Plane';
// import Backend from "react-dnd-html5-backend";
// import {dragImgItm} from '../components/ImgItem';
export const positionContext = createContext();
export const scrollPos = createContext();

function App() {
  const [value,setValue]=useState({
    x:0,
    y:0,
    move:false
  });
  const [scrollVal,setScrollVall]=useState(false);
  return (
    <scrollPos.Provider value={{scrollVal,setScrollVall}}>
    <positionContext.Provider value={{value,setValue}}>
        <Plane/>
    </positionContext.Provider>
    </scrollPos.Provider>
  );
}

export default App;