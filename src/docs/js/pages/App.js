import React ,{useState,createContext} from "react";
import Plane from '../components/Plane';
// import {dragImgItm} from '../components/ImgItem';
export const dragImgItm = createContext(false);
function App() {

  const [value,setValue]=useState(false)
  return (

    <dragImgItm.Provider value={{value,setValue}}>
          <Plane/>
    </dragImgItm.Provider>
  );
}

export default App;