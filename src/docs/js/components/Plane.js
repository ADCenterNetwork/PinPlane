import React,{useEffect} from "react";
import { Grid as PinPlane } from "react-virtualized";
import "../../../css/style.css";
import AutoSizer from "react-virtualized-auto-sizer";
import {itemsArray} from "../helpers/ListaImgItm";
import ImgIt from "./ImgItem";
import useMousePosition from './useMousePosition';
import useForceUpdate from 'use-force-update';
var scroll = new Boolean(false);
var isDragging = false;
function AddNewArray() {
  itemsArray.push(new Array(itemsArray[0].length))
}
export function HandleDrag(){
  isDragging=true;
  console.log(isDragging)
}
function cellRenderer({ columnIndex, key, rowIndex,isScrolling, style }) {
  scroll=isScrolling;
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
  var slider = document.getElementById("Grid_PinPlane");
  const forceUpdate = useForceUpdate();
  const {x,y}=useMousePosition();
  const ancho=panel.clientWidth;
  const altura=panel.clientHeight;

if(slider!=null){
  let isDown = false;
  let startX;
  let scrollLeft;
  
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
}

  if(scroll==true && x>=ancho-100){
    AddNewArray();
  }
  useEffect(() => {
    forceUpdate();
  }, [scroll==true && x>=ancho-100 ])
  itemsArray[0][5]=<ImgIt/>
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

