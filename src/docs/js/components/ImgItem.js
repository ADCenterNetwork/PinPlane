import React, { useState, useCallback,useContext} from "react";
import { useDropzone } from "react-dropzone";
import Draggable from "react-draggable";
import "../../../../src/css/App.css";
// const pos;
function ImgIt( props) {
  
  const [buttonState, setButtonState] = useState(false);
  const [currentIMG, setCurrentImg] = useState("");
  const [dropIMG, setDropIMG] = useState("");
  const [srcImg, setSrcImg] = useState("");
  const [state, setState] = useState({
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: 0, 
      y: 0,
    },
  });

  const onControlledDrag = (e, position) => {
   // console.log(position.x);
    const { x, y } = position; // actualizo la posicion del item
    setState({ controlledPosition: { x, y } });
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
  const controlledPosition = state.controlledPosition;
  return (
    
<Draggable position={controlledPosition} onDrag={onControlledDrag}>
    <div className="card">
      <div className="card-image">
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
