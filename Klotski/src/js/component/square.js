/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-04 10:46
 * @version 1.0
 * Description:
 */

import React from 'react';
import {pointer} from '../util/util';

export default function Square(props) {
    const value =props.sequence,
        level=props.level,
        size= props.size,
        offsetSize = props.size+2;
    let classStr ="square";
    const styleStr ={
        width:size,
        height:size,
        transform:'translate('+offsetSize*(value%level)+'px,'+offsetSize*Math.floor(value/level)+'px)'
    }
    return (
        <li
            className={classStr}
            style ={styleStr}
            onSelect = {(e)=>{e.preventDefault();}}
            onMouseDown={(e)=>{e.preventDefault(); pointer.listen(e,null,value)}}
            onTouchStart={(e)=>{ e.preventDefault();pointer.listen(e,null,value)}}
        >
            <span>{props.value}</span>
        </li>
    );
}