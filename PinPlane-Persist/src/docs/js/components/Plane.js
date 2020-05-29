import React, { useContext, useEffect, useState } from "react";
import { Grid as PinPlane } from "react-virtualized";
import "../../../css/style.css";
import AutoSizer from "react-virtualized-auto-sizer";
import { itemsArray } from "../helpers/ListaImgItm";
import useMousePosition from "./useMousePosition";
import useForceUpdate from "use-force-update";
import DragWindow from "./ScrollbyMouse";
import ImgIt from "./ImgItem";
import {positionContext} from '../pages/App';
var scroll = false;
var posArray = new Array(9);
function AddNewArray() {
  var x = itemsArray.length;
  x++;
  var celda;
posArray.length = x; 
  itemsArray.push(new Array(x));
  for (let i = 0; i < itemsArray.length; i++) {
    
    itemsArray[i].length = x;

    if(posArray[i] == undefined || posArray[i] == null) {
      posArray[i] = new Array(x);
    }else if(posArray[i].length === 0 ){
      posArray[i] = new Array(x);
    }
    posArray[i].length = x;

    for (let j = 0; j < itemsArray[i].length; j++) {
      if (itemsArray[i][j] !== i.toString + "," + j.toString) {
        itemsArray[i][j] = "";
      }
      let tmpstr = i + "" + j;
      celda = document.getElementById(tmpstr);
      if(celda != null){
        posArray[i][j]={y: celda.offsetTop, x: celda.offsetLeft};
      } 
    }
  }
}
function cellRenderer({ columnIndex, key, rowIndex, isScrolling, style }) {
  scroll = isScrolling;
  var img = document.getElementsByClassName("card react-draggable");
  return (
    <div
      id={rowIndex + "" + columnIndex}
      key={key}
      style={{
        ...style,
        left: style.left + 30,
        top: style.top + 30,
        width: style.width - 30,
        height: style.height - 30,
      }}
    >
      {itemsArray[rowIndex][columnIndex]}
    </div>
  );
}

export default function ImgList() {
  const [position1, setposition1] = useState({ x: 0, y: 60 });
  const [position2, setposition2] = useState({ x: 0, y: 0 });
  const [vecY1, setvecY1] = useState(0);
  const [vecX1, setvecX1] = useState(0);
  const {value,setValue }= useContext(positionContext)
  useEffect(() => {
    sessionStorage.setItem("1", JSON.stringify(position1));
    //sessionStorage.setItem("card2", JSON.stringify(position2));
  }, []);

 // itemsArray[1][3] = <ImgIt id={2} position={position2} />;
  var imgSize = 600;
  var panel = document.getElementById("root");
  const forceUpdate = useForceUpdate();
  const { x, y } = useMousePosition();
  const ancho = panel.clientWidth;
  const alto = panel.clientHeight;
  
  var isPossible = scroll === true && x >= ancho - imgSize;
  DragWindow(value, setValue);

  useEffect(() => {
    setposition1(JSON.parse(sessionStorage.getItem("1")));
 //   setposition2(JSON.parse(sessionStorage.getItem("card2")));
  }, [sessionStorage.getItem("1")]);

  useEffect(() => {
    AddNewArray();
  }, []);

  useEffect(() => {
    console.log("entra aqui: " +vecY1  + vecX1);
    AddNewArray();
    itemsArray[vecY1][vecX1] = <ImgIt id={1} position={position1} />;
    return () => {
      forceUpdate();
    };
  }, [vecX1, vecY1]);

  useEffect(() => {
    if (value.move==true) { 
      setvecX1(Math.floor(value.x/300));
      setvecY1(Math.floor(value.y/300));
      
    itemsArray[vecY1][vecX1] = <ImgIt id={1} position={position1} />;
      console.log(itemsArray)
    }
  }, [value.move]);

  return (
    <React.Fragment>
       <AutoSizer>
      {({ height, width }) => (
        <div style={{ height: height, width: width }}>
          <PinPlane
            className="Grid"
            id="Grid_PinPlane"
            cellRenderer={cellRenderer}
            columnCount={itemsArray[0].length}
            columnWidth={330}
            height={height}
            rowCount={itemsArray.length}
            rowHeight={330}
            width={width}
          ></PinPlane>
        </div>
      )}
    </AutoSizer>

    </React.Fragment>
   
  );
}
