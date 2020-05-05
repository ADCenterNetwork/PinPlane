import React, { useEffect } from "react";
import { Grid as PinPlane } from "react-virtualized";
import "../../../css/style.css";
import AutoSizer from "react-virtualized-auto-sizer";
import { itemsArray } from "../helpers/ListaImgItm";
import useMousePosition from "./useMousePosition";
import useForceUpdate from "use-force-update";
import DragWindow from './ScrollbyMouse';
import ImgIt from "./ImgItem";
// var scroll = false;

function AddNewArray() {
  itemsArray.push(new Array(itemsArray[0].length));
}
function cellRenderer({ columnIndex, key, rowIndex, isScrolling, style }) {
  // scroll = isScrolling;
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
let isDrag=false;
export default function ImgList() {
  itemsArray[5][5]=<ImgIt/>;
  // var panel = document.getElementById("root");
  const forceUpdate = useForceUpdate();
  const { x, y } = useMousePosition();
  // const ancho = panel.clientWidth;
  // const altura = panel.clientHeight;
  const objectoImgItem=document.querySelector("#Grid_PinPlane > div > div:nth-child(2) > div");
  if (objectoImgItem != null) {
    objectoImgItem.addEventListener("mousedown", (e) => {
      isDrag = true;
    });
    objectoImgItem.addEventListener("mouseup", () => {
      isDrag = false;
    });
  }
if(isDrag===false){
  DragWindow("no_remove");
}else{
  DragWindow("remove");
}
  // if (scroll === true && x >= ancho - 100) {
  //   AddNewArray();
  // }
  // useEffect(() => {
  //   forceUpdate();
  // }, [scroll === true && x >= ancho - 100]);
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
