import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Draggable from "react-draggable";
import useMousePosition from "./useMousePosition";
import "../../../../src/css/App.css";
// const pos;

function ImgIt(props) {
  const [buttonState, setButtonState] = useState(false);
  const [currentIMG, setCurrentImg] = useState("");
  const [dropIMG, setDropIMG] = useState("");
  const [srcImg, setSrcImg] = useState("");
  const { x, y } = useMousePosition();

  const [state, setState] = useState({
    controlledPosition: {
      x: 4,
      y: 10,
    },
  });
  const onControlledDrag = (e, position) => {
    e.stopPropagation();
    const { x, y } = position; // actualizo la posicion del item
    setState({ controlledPosition: { x, y } });
    console.log(e.target.id);
    setState({
      currentPos: e.target.id,
    });
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
    sessionStorage.setItem("card" + e.target.id, JSON.stringify(position));
  };

  const controlledPosition = state.controlledPosition;
  return (
    <Draggable
      position={props.position}
      onDrag={onControlledDrag}
      onStop={onStopDrag}
      onStart={(e) => {
        e.stopPropagation();
      }}
      id={props.id}
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
