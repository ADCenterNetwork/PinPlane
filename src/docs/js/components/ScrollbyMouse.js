
export default function DragWindow(value,setValue) {

  const slider = document.querySelector("#Grid_PinPlane")
  let isDown = false;
  let startX;
  let scrollLeft;
  var scrollTop
  let startY;
  const img=document.getElementsByClassName("card react-draggable");
  console.log(img);
  for (var i = 0 ; i < img.length; i++) {
  img[i].addEventListener("mousedown", (e) => {
    setValue(true);
  });
  img[i].addEventListener("mouseleave", () => {
    setValue(false);
  });
}


  if (slider != null && value===false) {
            slider.addEventListener("mousedown", (e) => {
                isDown = true;
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
                scrollTop=slider.scrollTop;
                startY = e.pageY - slider.offsetTop;
                setValue(false);
              });
              slider.addEventListener("mouseleave", () => {
                isDown = false;
                setValue(false);
              });
              slider.addEventListener("mouseup", () => {
                isDown = false;
                
                setValue(true);
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
        }
    }
    
  
//   if(slider != null && value===true){
//     console.log(value +" valor de Context en la funcion de remove");
//     slider.removeEventListener("mousedown", (e) => {
//         isDown = true;
//         startX = e.pageX - slider.offsetLeft;
//         scrollLeft = slider.scrollLeft;
//         scrollTop=slider.scrollTop;
//         startY = e.pageY - slider.offsetTop;
//         console.log(isDown + " soy isDown mousedown");
//       });
//     slider.removeEventListener("mouseleave", () => {
//         isDown = false;
//         console.log(isDown + " soy isDown mouseleave");
//       });
//     slider.removeEventListener("mouseup", () => {
//         isDown = false;
//         console.log(isDown + " soy isDown mouseup");
//       });
//     slider.removeEventListener("mousemove", (e) => {
//         if (!isDown) return;
//          e.preventDefault();
//         const x = e.pageX - slider.offsetLeft;
//         const y=e.pageY+slider.offsetTop;
//         const walk = (x - startX)*3; //scroll-fast
//         const walk2=(y-startY)*1
//         slider.scrollLeft = scrollLeft - walk;
//         slider.scrollTop = scrollTop - walk2;
//       });
//   }

