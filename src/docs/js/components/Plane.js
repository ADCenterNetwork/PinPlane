import React, { useContext, useEffect, useState } from "react";
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
// function AddNewArray() {
//   itemsArray.push(new Array(itemsArray[0].length));
// }
// function arrayVertical() {
//   for (let i = 0; i < itemsArray.length; i++) {
//     itemsArray[i].push(new Array([""]));
//   }
// }
function AddNewArray() {
  var x = itemsArray.length;
  x++;

  itemsArray.push(new Array(x));
  for (let i = 0; i < itemsArray.length; i++) {
    itemsArray[i].length = x;
    for (let j = 0; j < itemsArray[i].length; j++) {
      if (itemsArray[i][j] !== i.toString + "," + j.toString) {
        itemsArray[i][j] = "" + i + j;
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
  const [position1, setposition1] = useState({ x: 0, y: 61 });
  const [position2, setposition2] = useState({ x: 20, y: 200 });
  const [vecY1, setvecY1] = useState(0);
  const [vecX1, setvecX1] = useState(3);

  // sessionStorage.setItem("card1", JSON.stringify(position1));
  // sessionStorage.setItem("card2", JSON.stringify(position2));

  itemsArray[vecY1][vecX1] = <ImgIt id={1} position={position1} />;
  itemsArray[1][3] = <ImgIt id={2} position={position2} />;

  var panel = document.getElementById("root");
  const forceUpdate = useForceUpdate();
  const { x, y } = useMousePosition();
  const ancho = panel.clientWidth;
  const alto = panel.clientHeight;
  const { value, setValue } = useContext(dragImgItm);
  var isPossible = scroll === true && x >= ancho - 200;
  DragWindow(value, setValue);

  useEffect(() => {
    setposition1(JSON.parse(sessionStorage.getItem("card1")));
    setposition2(JSON.parse(sessionStorage.getItem("card2")));
  }, [sessionStorage.getItem("card1"), sessionStorage.getItem("card2")]);

  if (isPossible) {
    AddNewArray();
  }
  //vertical
  // if (isPossible) {
  //   arrayVertical();
  // }
  useEffect(() => {
    return () => {
      forceUpdate();
    };
  }, [isPossible]);

  //In case of error delete this code
  useEffect(() => {
    setTimeout(() => {
      if (
        position1.x >= ancho ||
        position2.x >= ancho ||
        position1.y >= alto ||
        position2.y >= alto
      ) {
        // let suma = vecX1 + 1;
        // console.log(suma);
        // setvecX1(10);
        document.getElementById("#03").removeChild("#1");
        document.getElementById("#13").removeChild();
        AddNewArray();
      }
    }, 300);
  }, [
    sessionStorage.getItem("card1"),
    sessionStorage.getItem("card2"),
    vecX1,
    position1,
    position2,
  ]);
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
          >
            <ImgIt />
          </PinPlane>
        </div>
      )}
    </AutoSizer>
  );
}
