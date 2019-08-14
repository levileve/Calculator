import React from 'react';
import './Button.css';

export default props => {
  const p = `button ${
    props.operation ? 
    'operation' :
    props.double ? 
    'double' :
    props.triple ? 
    'triple' :
    props.equals ? 'equals' : ''
  }`
  return (
    <button className={`${p}`}
      onClick = {(e) => props.click && props.click(props.label)}
    >
      {props.label}
    </button>
  )
}