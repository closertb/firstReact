/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 22:17
 * @version 1.0
 * Description:
 */
import React from 'react';
/*import Square from './square';*/
import {pointer} from "../util/util";
function Square(props) {
    const value =props.sequence,
        level=props.level,
        size= props.size,
        offsetSize = props.size+2;
    let classStr ="square";
    const styleStr ={
        width:size,
        height:size,
        top:offsetSize*Math.floor(value/level)+'px',
        left:offsetSize*(value%level)+'px'
    }
    if(props.value === 0 ){
        classStr = classStr + ' empty-block';
    }
    return (
        <li
            className={classStr}
            style ={styleStr}
            onSelect = {(e)=>{e.preventDefault();}}
            onMouseDown={(e)=>{e.preventDefault(); pointer.listen(e,null,value)}}
            onTouchStart={(e)=>{ pointer.listen(e,null,value)}}
        >
            <span>{props.value}</span>
        </li>
    );
}
export default class Block extends React.Component{
    constructor(){
        super();
        this.handleEvent = this.handleEvent.bind(this);

    }
    handleEvent(dir,index){
        if(dir==='none'){
            return ;
        }
        this.props.handle(dir,index);
    }
    renderSquare(i) {
        let val = this.props.squares[i];
        return (
            <Square
                value={val}
                sequence = {i}
                key = {i}
                level = {this.props.level}
                size = {this.size}
            />
        );
    }
    render() {
        this.size = this.props.size / this.props.level ;
        this.boxSize = this.props.size + this.props.level+1;
        const _this = this;
        const listItems = this.props.squares.map(function(t,index){
            return _this.renderSquare(index);
        });

        const styleStr ={
            width:this.boxSize+"px",
            height:this.boxSize+"px"
        };
        return (
            <ul className="widget-block"
                style={styleStr}
                size ={this.size }
                onSelect = {()=>{return false;}}
                onMouseUp={(e)=>{pointer.listen(e,this.handleEvent)}}
                onTouchEnd={(e)=>{pointer.listen(e,this.handleEvent)}}
            >
                {listItems}
            </ul>
        );
    }
}