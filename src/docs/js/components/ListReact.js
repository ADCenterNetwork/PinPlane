import React, { Component } from 'react';
import ReactList from 'react-list';
// const renderItem = (index, key) => (
//   <div key={key} className={'item' + (index % 2 ? '' : ' even')}>
//     {index}
//   </div>
// );
// renderItem.toJSON = () => renderItem.toString();
import {itemsArray} from "../helpers/ListaImgItm";

const renderSquareItem = (index, key) => (
  <div key={key} className={'square-item' + (index % 2 ? '' : ' even')}>
   {itemsArray[index]}
  </div>
);
const renderGridLine = (row, key) => (
  <ReactList
    axis='x'
    key={key}
    length={1000}
    itemRenderer={(column, key) => renderSquareItem(column + 10000 * row, key)}
    type='uniform'
  />
);

const examples = [

  {
    length: 10000,
    itemRenderer: renderGridLine,
    type: 'uniform',
    useTranslate3d: true
  }
];

export default class Examples extends Component {
  
  renderExamples() {
    return examples.map((props, key) => (
      <div key={key} className={`example axis-${props.axis}`}>
        <div className='component' style={{ overflow: 'auto'}} onScroll={this.handleScroll}>
          <ReactList {...props} />
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className='index'>
        <div className='examples'>{this.renderExamples()}</div>
      </div>
    );
  }
}