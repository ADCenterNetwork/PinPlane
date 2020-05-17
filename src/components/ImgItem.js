import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDrag } from "react-dnd";
import ItemTypes from "../helpers/Constants";

const ImgItem = props => {
  const [buttonState, setButtonState] = useState(false);
  const [currentIMG, setCurrentImg] = useState("");
  const [dropIMG, setDropIMG] = useState("");
  const [srcImg, setSrcImg] = useState("");

  const [{ isDragging }, drag] = useDrag({
    item: {
      id: props.position.id,
      type: ItemTypes.ImgItem
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const onDrop = useCallback(acceptedFiles => {
    let string = acceptedFiles[0].name.split("\\");

    setDropIMG("./img/" + string[string.length - 1]);
    setCurrentImg("");
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const saveIMG = current => {
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

  const estilos = {
    position: "absolute",
    left: `${props.position.img[0]}px`,
    top: `${props.position.img[1]}px`
  };

  return (
    <div className="card" ref={drag} style={estilos}>
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
              onChange={e => {
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
  );
};

export default ImgItem;
