/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-03-29 21:00
 * @version 1.0
 * Description:
 */
import React from 'react'
import { store } from '../store/reducers';

export default class Counter extends React.Component{
    constructor(props){
        super(props);
        this.onDecrement = this.onDecrement.bind(this);
        this.onIncrement = this.onIncrement.bind(this);
        this.showLog = this.showLog.bind(this)
        this.state = {
            value:0
        }
    }
    showLog(){
        this.setState({value:store.getState()});
    }
    onIncrement(){
        store.dispatch({type:'INCREMENT_ASYNC'});
    }
    onDecrement(){
        store.dispatch({type:'DECREMENT'});
    }
    componentDidMount(){
        store.subscribe(this.showLog);
    }
    render() {
        return (<div className="counter">
            <h1>{this.state.value}</h1>
            <button onClick={this.onIncrement}>+</button>
            <button onClick={this.onDecrement}>-</button>
        </div>)
    }
}

