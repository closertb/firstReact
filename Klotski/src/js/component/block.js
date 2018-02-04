/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-01 22:17
 * @version 1.0
 * Description:
 */
import React from 'react';
import Square from './square';
import {pointer} from "./util";
function Squa(props) {

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
            />
        );
    }
    render() {
        const _this = this;
        const listItems = this.props.squares.map(function(t,index){
            return _this.renderSquare(index);
        });
        const className = "widget-block "+'level-'+this.props.level;
        return (
            <ul className={className}
                onSelect = {()=>{return false;}}
                onMouseUp={(e)=>{pointer.listen(e,this.handleEvent)}}
                onTouchEnd={(e)=>{pointer.listen(e,this.handleEvent)}}
            >
                {listItems}
            </ul>
        );
    }
}