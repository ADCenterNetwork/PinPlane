// import { useState } from "react";
export default function DragWindow(props) {

  const slider = document.getElementById("Grid_PinPlane");
  let isDown = false;
  let startX;
  let scrollLeft;
  var scrollTop
  let startY;
  if (slider != null && props==="no_remove") {
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
      const walk2=(y-startY)*1
      slider.scrollLeft = scrollLeft - walk;
      slider.scrollTop = scrollTop - walk2;
    });
  }else if(props==="remove"){
      
    console.log("Remove");
    slider.removeEventListener("mousedown" , (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        scrollTop=slider.scrollTop;
        startY = e.pageY - slider.offsetTop;
      });
    slider.removeEventListener("mouseleave", () => {
        isDown = false;
      });
    slider.removeEventListener("mouseup", () => {
        isDown = false;
      });
    slider.removeEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const y=e.pageY+slider.offsetTop;
        const walk = (x - startX)*3; //scroll-fast
        const walk2=(y-startY)*1
        slider.scrollLeft = scrollLeft - walk;
        slider.scrollTop = scrollTop - walk2;
      });
  }
}
