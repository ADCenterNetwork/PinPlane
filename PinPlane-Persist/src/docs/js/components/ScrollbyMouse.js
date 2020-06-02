import react, { useState, useEffect } from "react";
export default function DragWindow() {
  let isDown = false;
  let startX;
  let scrollLeft;
  var scrollTop;
  let startY;
  var slider = document.querySelector("#Grid_PinPlane");
  var img = document.getElementsByClassName("card react-draggable");
  // for (var i = 0; i < img.length; i++) {
  //   img[i].addEventListener("mouseenter", (e) => {

  //     isDown = false;
  //   });
  //   img[i].addEventListener("mouseover", (e) => {

  //     isDown = false;
  //   });
  // }

  // useEffect(() => {
  //   for (var i = 0; i < img.length; i++) {
  //     img[i].addEventListener("mouseenter", (e) => {

  //       isDown = false;
  //       e.stopPropagation();
  //     });
  //     img[i].addEventListener("mouseover", (e) => {
  //       isDown = false;
  //       e.stopPropagation();
  //     });
  //     img[i].addEventListener("mousedown", (e) => {
  //       isDown = false;
  //     });
  //     img[i].addEventListener("mouseup", (e) => {
  //       isDown = false;
  //     });
  //     img[i].addEventListener("mousemove", (e) => {
  //       isDown = false;
  //       e.stopPropagation();
  //     });
  //   }
  // });

  function RespondMouseDown(e) {
    slider.classList.add("active");

    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    scrollTop = slider.scrollTop;
    startY = e.pageY - slider.offsetTop;
  }

  function ResponseEnter() {
    slider.removeEventListener("mousedown", (e) => RespondMouseDown(e));
    slider.removeEventListener("mousemove", (e) => RespondMouseMove(e));

    isDown = false;
    slider.classList.remove("active");
  }
  function RespondMouseUp() {
    slider.removeEventListener("mousedown", (e) => RespondMouseDown(e));
    slider.removeEventListener("mousemove", (e) => RespondMouseMove(e));

    isDown = false;
    slider.classList.remove("active");
  }
  function RespondLeave() {
    slider.addEventListener("mousedown", (e) => RespondMouseDown(e));
    slider.addEventListener("mouseleave", RespondLeave);
    slider.addEventListener("mouseup", RespondMouseUp);
    slider.addEventListener("mousemove", (e) => RespondMouseMove(e));

    isDown = false;
    slider.classList.remove("active");
  }
  function RespondMouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
    e.stopPropagation();
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY + slider.offsetTop;
    const walk = (x - startX) * 3; //scroll-fast
    const walk2 = (y - startY) * 1;
    slider.scrollLeft = scrollLeft - walk;
    slider.scrollTop = scrollTop - walk2;
  }

  if (slider != null) {
    slider.addEventListener("mousedown", (e) => RespondMouseDown(e));
    slider.addEventListener("mouseleave", RespondLeave);
    slider.addEventListener("mouseup", RespondMouseUp);
    slider.addEventListener("mousemove", (e) => RespondMouseMove(e));
    slider.addEventListener("mouseenter", ResponseEnter);
  }
}