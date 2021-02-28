import React, { Component } from "react";
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
export default class TestApp extends Component {
    constructor(props) {
        super(props);
    
        // This binding is necessary to make `this` work in the callback
        this.rollAll = this.rollAll.bind(this);
      }
    rollAll() {
        this.reactDice.rollAll();
      }
  render() {
    return (
      <div>
        <ReactDice
          numDice={6}
          rollDone={this.rollDoneCallback}
          ref={(dice) => (this.reactDice = dice)}
          faceColor={"#f8f8f8"}
          outlineColor={"#444"}
        />
        <button onClick={() => this.rollAll()}>roll dice</button>
      </div>
    );
  }

 

  rollDoneCallback(num) {
    console.log(`You rolled a ${num}`);
  }
}
