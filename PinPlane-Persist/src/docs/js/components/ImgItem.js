import React, { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Draggable from "react-draggable";
import useMousePosition from "./useMousePosition";
import "../../../../src/css/App.css";
import {positionContext} from '../pages/App';
// const pos;

function ImgIt(props) {
  const [buttonState, setButtonState] = useState(false);
  const [currentIMG, setCurrentImg] = useState("");
  const [dropIMG, setDropIMG] = useState("");
  const [srcImg, setSrcImg] = useState("");
  const { xm, ym } = useMousePosition();
  const {setValue }= useContext(positionContext)
  const [state, setState] = useState({
    controlledPosition: {
      x: 4,
      y: 10,
    },
  });
  const onControlledDrag = (e, position) => {
    // const { x, y } = position; // actualizo la posicion del item
    // setState({ controlledPosition: { x, y } });
    setValue({x:xm,y:ym,move:false});
    e.stopPropagation();
  };
  const onDrop = useCallback((acceptedFiles) => {
    let string = acceptedFiles[0].name.split("\\");

    setDropIMG("./img/" + string[string.length - 1]);
    setCurrentImg("");
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const saveIMG = (current) => {
    if (dropIMG === "" || currentIMG !== "") {
      if (current !== "") {
        let string = current.split("\\");
        setSrcImg("./img/" + string[string.length - 1]);
      } else {
        setSrcImg(currentIMG);
      }

      setButtonState(false);
    } else if (currentIMG === "" || dropIMG !== "") {
      setButtonState(false);
      setSrcImg(dropIMG);
    }
  };

  const editIMG = () => {
    setDropIMG("");
    setCurrentImg("");
    setButtonState(true);
  };

  const onStopDrag = (e, ui) => {
    let position = { x: ui.x + ui.deltaX, y: ui.y + ui.deltaY };
    setValue({x:e.x,y:e.y,move:true})
    //sessionStorage.setItem("card" + e.target.id, JSON.stringify(position));
  };

  return (
    <Draggable
    // position={props.position}
    onDrag={(e)=>onControlledDrag(e)}
    onStart={(e)=>{
      e.stopPropagation();
    }}
    onStop={(e, ui)=>onStopDrag(e, ui)}
    id={props.id}
    onMouseDown={(e)=>{
      e.stopPropagation();
    }}
    // bounds={".ReactVirtualized__Grid__innerScrollContainer"}
  >
      <div className="card" id={props.id}>
        <div className="card-image" id={props.id}>
          {!buttonState ? (
            <img
              src={srcImg === "" ? "./img/default_image.png" : srcImg}
              alt=""
            ></img>
          ) : (
            <div className="fileSelectors">
              <input
                type="file"
                name="img"
                onChange={(e) => {
                  setCurrentImg(e.target.value);
                }}
              ></input>
              <div className="imgcontainer" {...getRootProps()}>
                {isDragActive ? (
                  <p>Drop your image here</p>
                ) : (
                  <div>
                    {dropIMG !== "" ? (
                      <img src={dropIMG} alt=""></img>
                    ) : (
                      <p>You can drop an image</p>
                    )}
                  </div>
                )}
                <div className="DropZone" {...getInputProps()}></div>
              </div>
            </div>
          )}
        </div>
        <div className="waves-effect waves-light deep-purple lighten-1 flotar">
          {!buttonState ? (
            <p
              className="material-icons"
              onClick={() => {
                editIMG();
              }}
            >
              Edit
            </p>
          ) : (
            <p
              className="material-icons"
              onClick={() => {
                saveIMG(currentIMG);
              }}
            >
              Save
            </p>
          )}
        </div>
      </div>
    </Draggable>
  );
}
export default ImgIt;
