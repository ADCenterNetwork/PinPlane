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
  const [position1, setposition1] = useState({ x: -100, y: 61 });
  const [position2, setposition2] = useState({ x: -300, y: 125 });
  const [vecY1, setvecY1] = useState(0);
  const [vecX1, setvecX1] = useState(3);

  useEffect(() => {
    sessionStorage.setItem("card1", JSON.stringify(position1));
    sessionStorage.setItem("card2", JSON.stringify(position2));
  }, []);
  const MoveItem = () => {
    console.log("move");
    itemsArray[1][3] = "";
    console.log(itemsArray[1][3]);
    let img = document.getElementById("1");
    img.parentNode.removeChild(img);
    itemsArray[2][8] = <ImgIt id={1} position={position1} />;
  };

  itemsArray[vecY1][vecX1] = <ImgIt id={1} position={position1} />;
  itemsArray[1][3] = <ImgIt id={2} position={position2} />;

  itemsArray[3][2] = <button onClick={MoveItem}>Move Item</button>;

  var panel = document.getElementById("root");
  const forceUpdate = useForceUpdate();
  const { x, y } = useMousePosition();
  const ancho = panel.clientWidth;
  const alto = panel.clientHeight;
  const { value, setValue } = useContext(dragImgItm);
  var isPossible = false;
  var isPossibleY = false;
  isPossible = scroll === true && x >= ancho - 500;
  isPossibleY = scroll === true && y >= alto - 200;
  DragWindow(value, setValue);

  useEffect(() => {
    setposition1(JSON.parse(sessionStorage.getItem("card1")));
    setposition2(JSON.parse(sessionStorage.getItem("card2")));
  }, [sessionStorage.getItem("card1"), sessionStorage.getItem("card2")]);

  if (isPossibleY) {
    AddNewArray();
    console.log(itemsArray.length);
    setvecY1(vecY1 + 1);
  }

  useEffect(() => {
    if (isPossible) {
      AddNewArray();
      console.log(itemsArray.length);
      let vX = vecX1 + 1;
      setvecX1(vX);
    }
  }, [isPossible]);

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
        ></PinPlane>
      )}
    </AutoSizer>
  );
}
