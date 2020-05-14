import react, { useState, useEffect } from "react";
export default function DragWindow(value, setValue) {
  let isDown = false;
  let startX;
  let scrollLeft;
  var scrollTop;
  let startY;
  const [render, setrender] = useState(false);
  var slider = document.querySelector("#Grid_PinPlane");
  var img = document.getElementsByClassName("card react-draggable");
  for (var i = 0; i < img.length; i++) {
    img[i].addEventListener("mousedown", (e) => {
      setValue(true);

      isDown = false;
    });
    img[i].addEventListener("mouseup", (e) => {
      setValue(false);
      isDown = false;
    });
    img[i].addEventListener("mousemove", (e) => {
      setValue(true);
      isDown = false;
    });
    img[i].addEventListener("mouseleave", (e) => {
      setValue(false);
      isDown = false;
    });
    img[i].addEventListener("mouseout", (e) => {
      setValue(false);
      isDown = false;
    });
  }

  useEffect(() => {
    if (render == true) {
      for (var i = 0; i < img.length; i++) {
        img[i].addEventListener("mousedown", (e) => {
          setValue(true);
          isDown = false;
        });
        img[i].addEventListener("mouseup", (e) => {
          setValue(false);
          isDown = false;
        });
        img[i].addEventListener("mousemove", (e) => {
          setValue(true);
          isDown = false;
        });
        img[i].addEventListener("mouseleave", (e) => {
          setValue(false);
          isDown = false;
        });
        img[i].addEventListener("mouseout", (e) => {
          setValue(false);
          isDown = false;
        });
      }
    }
  }, [render, slider, value]);

  function RespondMouseDown(e) {
    slider.classList.add("active");
    setValue(false);

    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    scrollTop = slider.scrollTop;
    startY = e.pageY - slider.offsetTop;
  }
  function RespondMouseUp() {
    setValue(true);
    setrender(true);

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
    setValue(true);
    isDown = false;
    slider.classList.remove("active");
  }
  function RespondMouseMove(e) {
    setrender(false);
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY + slider.offsetTop;
    const walk = (x - startX) * 3; //scroll-fast
    const walk2 = (y - startY) * 1;
    slider.scrollLeft = scrollLeft - walk;
    slider.scrollTop = scrollTop - walk2;
  }

  if (slider != null && value == false) {
    slider.addEventListener("mousedown", (e) => RespondMouseDown(e));
    slider.addEventListener("mouseleave", RespondLeave);
    slider.addEventListener("mouseup", RespondMouseUp);
    slider.addEventListener("mousemove", (e) => RespondMouseMove(e));
  }
}
