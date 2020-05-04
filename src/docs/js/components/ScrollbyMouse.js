// import { useState } from "react";
export default function Drag() {

  const slider = document.getElementById("Grid_PinPlane");
  let isDown = false;
  let startX;
  let scrollLeft;
  var scrollTop
  let startY;
  if (slider != null) {
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      scrollTop=slider.scrollTop;
      startY = e.pageY - slider.offsetTop;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const y=e.pageY+slider.offsetTop;
      const walk = (x - startX)*3; //scroll-fast
      const walk2=(y-startY)*3
      slider.scrollLeft = scrollLeft - walk;
      slider.scrollTop = scrollTop - walk2;
    });
  }
}
