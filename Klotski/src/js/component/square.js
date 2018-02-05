/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-04 10:46
 * @version 1.0
 * Description:
 */

import React from 'react';
import {pointer} from '../util/util';

export default class Square extends React.Component {
    render() {
        var value =this.props.sequence,level=this.props.level;
        var style ="square"+' pos-y'+Math.floor(value/level) + ' pos-x'+value%level;
        if(this.props.value === 0 ){
            style = style + ' empty-block';
        }
        return (
            <li
                className={style}
                onSelect = {(e)=>{e.preventDefault();}}
                onMouseDown={(e)=>{e.preventDefault(); pointer.listen(e,null,value)}}
                onTouchStart={(e)=>{ pointer.listen(e,null,value)}}
            >
                <span>{this.props.value}</span>
            </li>
        );
    }
}