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

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = new Array(rows);
  }

  return arr;
}
const auxArray=Create2DArray(2);

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
function cellRenderer({ columnIndex, key, rowIndex, style }) {
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
  // const [position1, setposition1] = useState({ x: 0, y: 61 });
  const [vecY1, setvecY1] = useState(0);
  const [vecX1, setvecX1] = useState(0);
 
  const {x}=useMousePosition();
  const {value,setValue }= useContext(positionContext)
  // useEffect(() => {
  //   sessionStorage.setItem("1", JSON.stringify(position1));
  // }, []);
  itemsArray[vecY1][vecX1] = <ImgIt id={1} />;
  const forceUpdate = useForceUpdate();
  const {scrollVal,setScrollVall }= useContext(scrollPos)
  DragWindow();
  // useEffect(() => {
//     setposition1(JSON.parse(sessionStorage.getItem("1")));
//  //   setposition2(JSON.parse(sessionStorage.getItem("card2")));
//   }, [sessionStorage.getItem("1")]);
  useEffect(() => {
         forceUpdate();
    
  }, [])
  useEffect(() => {
    AddNewArray();
    setScrollVall(false)
    return () => {
      forceUpdate();
    };
  }, [scrollVal]);


  // useEffect(() => {
  //   AddNewArray();
  //   itemsArray[vecY1][vecX1] = <ImgIt id={1} position={position1} />;
  //   return () => {
  //     forceUpdate();
  //   };
  // }, [vecX1, vecY1]);
  useEffect(() => {
    auxArray[0][0]=itemsArray[vecY1][vecX1];
    itemsArray[vecY1][vecX1]="";
    if (value.move==true) { 
      setValue({...value,move:false})

      setvecX1(Math.floor(value.x/330));
      setvecY1(Math.floor(value.y/330));


    }

    return()=>{

      auxArray[0][0]=itemsArray[vecY1][vecX1];
    };
  }, [value.move]);
  console.log(itemsArray)
  return (
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
   
  );
}
