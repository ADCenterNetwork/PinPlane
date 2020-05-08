import { useEffect} from 'react';
export default function DragWindow(value,setValue) {
    let isDown = false;
    let startX;
    let scrollLeft;
    var scrollTop
    let startY;
    const slider = document.querySelector("#Grid_PinPlane") ;
//     const img=document.getElementsByClassName("card react-draggable");
// useEffect(() => {
//     return () => {
//         for (var i = 0 ; i < img.length; i++) {
//             img[i].addEventListener("mousedown", (e) => {
//                 setValue(true);
//                 isDown = false;
//               });
//               img[i].addEventListener("mouseup", (e) => {
//                 setValue(false);
//                 isDown = false;
//               });
//             img[i].addEventListener("mousemove", (e) => {
//             setValue(true);
//             isDown = false;
//           });
//             img[i].addEventListener("mouseleave", (e) => {
//             setValue(false);
//             isDown = false;
//           });
//           img[i].addEventListener("mouseout", (e) => {
//             setValue(false);
//             isDown = false;
//           });
//         }
//     }
// })

function RespondMouseDown(e){
    slider.classList.add('active');
    setValue(false);
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    scrollTop=slider.scrollTop;
    startY = e.pageY - slider.offsetTop;
}
function RespondMouseUp() {
    setValue(true);
    isDown = false;
    slider.classList.remove('active');
}
function RespondLeave() {
    setValue(true);
    isDown = false;
    slider.classList.remove('active');
}
function RespondMouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
   const x = e.pageX - slider.offsetLeft;
   const y=e.pageY+slider.offsetTop;
   const walk = (x - startX)*3; //scroll-fast
   const walk2=(y-startY)*1
   slider.scrollLeft = scrollLeft - walk;
   slider.scrollTop = scrollTop - walk2;
}

  if (slider != null && value===false) {
            slider.addEventListener("mousedown",(e)=> RespondMouseDown(e));
              slider.addEventListener("mouseleave",RespondLeave);
              slider.addEventListener("mouseup",RespondMouseUp);
              slider.addEventListener("mousemove", (e) => RespondMouseMove(e));
        }
    }
    

