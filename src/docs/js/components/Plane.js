import React, { useContext,useEffect } from "react";
import { Grid as PinPlane } from "react-virtualized";
import "../../../css/style.css";
import AutoSizer from "react-virtualized-auto-sizer";
import { itemsArray } from "../helpers/ListaImgItm";
import useMousePosition from "./useMousePosition";
import useForceUpdate from "use-force-update";
import DragWindow from "./ScrollbyMouse";
import ImgIt from "./ImgItem";
import { dragImgItm } from "../pages/App";
var scroll = false;
function AddNewArray() {
  itemsArray.push(new Array(itemsArray[0].length));
}
function arrayVertical() {
  for (let i = 0; i < itemsArray.length; i++) {
    itemsArray[i].push(new Array([""]));
  }
}
function cellRenderer({ columnIndex, key, rowIndex,isScrolling, style }) {
  scroll = isScrolling;
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
  itemsArray[0][3] = <ImgIt />;
  itemsArray[1][3] = <ImgIt />;
  itemsArray[10][14] = <ImgIt />;
  var panel = document.getElementById("root");
  const forceUpdate = useForceUpdate();
  const { x, y } = useMousePosition();
  const ancho = panel.clientWidth;
  const altura = panel.clientHeight;
  const { value, setValue } = useContext(dragImgItm);

  DragWindow(value, setValue);

  if (scroll === true && x >= ancho - 100) {
    AddNewArray();
  }

 
  //vertical
  if (scroll === true && y >= altura - 100) {
    arrayVertical();
  }
  useEffect(() => {
    forceUpdate();
  }, [scroll === true && x >= ancho - 100]);

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
