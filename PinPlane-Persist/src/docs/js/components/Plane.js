import React, { useContext, useEffect, useState } from "react";
import { Grid as PinPlane } from "react-virtualized";
import "../../../css/style.css";
import AutoSizer from "react-virtualized-auto-sizer";
import { itemsArray } from "../helpers/ListaImgItm";
import useForceUpdate from "use-force-update";
import DragWindow from "./ScrollbyMouse";
import ImgIt from "./ImgItem";
import {positionContext} from '../pages/App';
import useMousePosition from './useMousePosition'
import {scrollPos} from '../pages/App';
var posArray = new Array(9);
var horiontal;
var Top;

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
function cellRenderer({ columnIndex, key, rowIndex, scrollLeft,scrollTop, style }) {
  horiontal=scrollLeft;
  Top=scrollTop;

  
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
  const [position1, setposition1] = useState({ x: 0, y: 61 });
  const [vecY1, setvecY1] = useState(0);
  const [vecX1, setvecX1] = useState(0);
  const {value,setValue }= useContext(positionContext)
  const {x}=useMousePosition();
  useEffect(() => {
    sessionStorage.setItem("1", JSON.stringify(position1));
    //sessionStorage.setItem("card2", JSON.stringify(position2));
  }, []);
  itemsArray[vecY1][vecX1] = <ImgIt id={1} position={position1} />;
 // itemsArray[1][3] = <ImgIt id={2} position={position2} />;
  const forceUpdate = useForceUpdate();
  const {scrollVal,setScrollVall }= useContext(scrollPos)
  DragWindow();

  useEffect(() => {
    setposition1(JSON.parse(sessionStorage.getItem("1")));
 //   setposition2(JSON.parse(sessionStorage.getItem("card2")));
  }, [sessionStorage.getItem("1")]);

  // useEffect(() => {
  //   AddNewArray();
  // }, []);
console.log(scrollVal)
  useEffect(() => {
    AddNewArray();
    setScrollVall(false)
    return () => {
      forceUpdate();
    };
  }, [scrollVal]);

  useEffect(() => {
    if (value.move==true) { 
      setValue({...value,move:false})
      setvecX1(Math.floor(value.x/330));
      setvecY1(Math.floor(value.y/330));

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
