import React,{useRef,useEffect} from "react";
import { Grid as PinPlane } from "react-virtualized";
import "../../../css/style.css";
import AutoSizer from "react-virtualized-auto-sizer";
import {itemsArray} from "../helpers/ListaImgItm";
import ImgIt from "../components/ImgItem";
import useMousePosition from '../components/useMousePosition';
import useForceUpdate from 'use-force-update';
var scroll = new Boolean(false);
function AddNewArray() {
  itemsArray.push(new Array(itemsArray[0].length))
  itemsArray[itemsArray[0].length-1][itemsArray[0].length-1].push(new Array(itemsArray[0].length))
  // itemsArray.push([<ImgIt /> ,"" ,"","" , "","" , "","", "", "","","" ,"" ,"","" , "","" , "","", "", "","","" ,"" ,"","" , "","" , "","", "", "","", ]);
  return(
    itemsArray
  );
}

function cellRenderer({ columnIndex, key, rowIndex,isScrolling, style }) {
  scroll=isScrolling;
  console.log(isScrolling,scroll)
  return (
    <div
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
  var panel = document.getElementById("root");
  useEffect(() => {
    forceUpdate();
  }, [scroll==true ])
  const forceUpdate = useForceUpdate();
  // console.log(scroll)
  const {x,y}=useMousePosition();
  const ancho=panel.clientWidth;
  const altura=panel.clientHeight;
  // console.log(x,y)
  if(scroll==true && x>=ancho-100){
    AddNewArray();
  }
    console.log("Vertical: " + window.scrollY);
    console.log("Horizontal: " + window.scrollX);

  return (
      <AutoSizer>
        {({ height, width }) => (
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
          />
          
        )}
      </AutoSizer>
      
  );
}  

