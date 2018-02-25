/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 22:17
 * @version 1.0
 * Description:
 */
import React from 'react';
import Square from './square';
import {pointer} from "../util/util";

export default class Block extends React.Component{
    constructor(props){
        super(props);
        this.size = this.props.size / this.props.level ;
        this.boxSize = this.props.size + this.props.level+1;
        this.handleEvent = this.handleEvent.bind(this);
    }
    handleEvent(dir,index){
        if(this.props.simple || dir==='none'){
            return ;
        }
        this.props.handle(dir,index);
    }
    renderSquare(i) {
        let val = this.props.squares[i];
        if(val === 0 ){
            return null;
        }
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
        const _this = this;
        const listItems = this.props.squares.map(function(t,index){
            return _this.renderSquare(index);
        });
        const className = this.props.simple ? 'widget-block add-filter':'widget-block';
        const styleStr ={
            width:this.boxSize+"px",
            height:this.boxSize+"px"
        };
        return (
            <ul className={className}
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