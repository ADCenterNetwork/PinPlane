import React, { useState } from "react";
import Draggable from "react-draggable"; // The default
function BoxDrag() {
  //************************************* */


  // controlar la posicion del item meidante codigo
  //*********************************** */
  const [state, setState] = useState({
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: 400, // posicion por defecto
      y: 200,
    },
  });

  const onControlledDrag = (e, position) => {
    console.log(position.x);
    const { x, y } = position; // actualizo la posicion del item
    setState({ controlledPosition: { x, y } });
  };

  const controlledPosition = state.controlledPosition;
  return (
    <Draggable position={controlledPosition} onDrag={onControlledDrag}>
      <div className="box">
          Hola Mundo :D
      </div>
    </Draggable>

  );
}
export default BoxDrag;
