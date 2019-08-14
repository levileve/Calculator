import React, {Component} from 'react';
import './Calculator.css';

import Button from '../../components/Button';
import Display from '../../components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current:0
}

export default class Calculadora extends Component {

  state = {...initialState}

  constructor(props){
    super(props);
    this.addDigit =  this.addDigit.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.clearMemory = this.clearMemory.bind(this);
    this.eraser = this.eraser.bind(this);
  }

  clearMemory() {
    this.setState({...initialState});
  }

  setOperation(operation) {

    if(this.state.current === 0) {
      this.setState({operation, current: 1, clearDisplay: true});
    } else  {
      const equals = operation === '=';
      const currentOperation = this.state.operation;

      const values = [...this.state.values];

      if((values[0] === 0 || values[1] === 0) && (parseFloat(this.state.displayValue) === values[0] || parseFloat(this.state.displayValue === values[1]))) {
        return;
      } else {
          if(currentOperation === '+') {
            values[0] = values[0] + values[1];
          } else
          if(currentOperation === '-') {
            values[0] = values[0] - values[1];
          } else
          if(currentOperation === '/') {
            values[0] = values[0] / values[1];
          } else
          if(currentOperation === '*') {
            values[0] = values[0] * values[1];
          } else {
            values[0] = this.state.values[0];
          }

          values[1] = 0;
          const displayValue = values[0].toString();
          this.setState({
            values,
            displayValue,
            operation: equals ? null : operation,
            current: equals ? 0 : 1,
            clearDisplay: !equals
          });
      }
    }
  }

  addDigit(n) {

    if(n === '.' && this.state.displayValue.toString().includes('.') && this.state.current === 0) {
      return;
    }
    const clearDisplay = (this.state.displayValue === '0' && n !== '.') 
          || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue.toString();
    const displayValue = 
    this.state.values[1] === 0 && 
    this.state.current === 1 &&
    parseFloat(this.state.displayValue) > 0
    ? '0'+(currentValue + n).toString()  : (currentValue + n).toString() ;

    this.setState({displayValue, clearDisplay: false});

    if(n !== '.') {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] =  newValue;
      this.setState({values});
    }
  }

  eraser() {
    const i = this.state.current;
    const status = {...this.state}
    const value = status.displayValue.toString();

    const displayValue = value.length > 1 ? value.substring(0,(value.length - 1)) : '0';

    const newValue = parseFloat(displayValue);
    const values = [...this.state.values];
    values[i] =  newValue;

    this.setState({displayValue,values});
  }

  render() {

    return(
      <div className='calculator'>
        <Display value={this.state.displayValue}/>
        <Button label='AC' click={this.clearMemory} double/>
        <Button label='<-' click={this.eraser} double/>
        <Button label='7'  click={this.addDigit} />
        <Button label='8'  click={this.addDigit}/>
        <Button label='9'  click={this.addDigit}/>
        <Button label='/'  click={this.setOperation} operation/>
        <Button label='4'  click={this.addDigit}/>
        <Button label='5'  click={this.addDigit}/>
        <Button label='6'  click={this.addDigit}/>
        <Button label='*'  click={this.setOperation} operation/>
        <Button label='1'  click={this.addDigit}/>
        <Button label='2'  click={this.addDigit}/>
        <Button label='3'  click={this.addDigit}/>
        <Button label='-'  click={this.setOperation} operation/>
        <Button label='0'  click={this.addDigit}/>
        <Button label='.'  click={this.addDigit} />
        <Button label='='  click={this.setOperation} equals/>
        <Button label='+'  click={this.setOperation} operation/>
      </div>
    )
  }
}