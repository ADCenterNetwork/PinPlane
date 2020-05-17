import React, { useState, useEffect, useReducer } from "react";

import { useDrop } from "react-dnd";
import styled from "styled-components";
import ImgItem from "./ImgItem";
import ItemTypes from "../helpers/Constants";

const PinPlane = styled.div`
  min-height: 1000px;
  min-width: 1000px;
  margin: 0 auto;
  border: 1px dotted black;
  display: flex;
`;

const Plane = props => {
  const manageItems = (state, action) => {
    // const uniqueid = require("uniqid");
    switch (action.type) {
      case "updatePosition":
        state.forEach(element => {
          if (element.id == action.payload) {
            element.img = action.updatedPosition;
          }
        });

        return state;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(manageItems, [
    {
      id: 1,
      img: [300, 200]
    },
    {
      id: 2,
      img: [500, 200]
    }
  ]);

  //const uniqueid = require("uniqid");
  const [dropTargetProps, drop] = useDrop({
    accept: ItemTypes.ImgItem,
    drop: (item, monitor) => {
      dispatch({
        type: "updatePosition",
        payload: item.id,
        updatedPosition: [
          monitor.getSourceClientOffset().x,
          monitor.getSourceClientOffset().y
        ]
      });
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <PinPlane ref={drop}>
      <ImgItem position={state[0]} />
      <ImgItem position={state[1]} />
    </PinPlane>
  );
};

export default Plane;
