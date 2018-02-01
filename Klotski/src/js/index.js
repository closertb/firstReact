/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-01 21:47
 * @version 1.0
 * Description:
 */
import '../css/index.scss';

import React from 'react';
import { render } from 'react-dom'

import Block from './component/block'

/*
export default class Game extends React.Component {

}*/

    const squares= Array(9).fill(null).map(function (t,index) {
        console.log(t,index);
        return index+1;
    });
    const handleClick =(e)=>{
            console.log(e);
    };

render(
    <Block onClick={handleClick} squares = {squares}/>,
    document.getElementById('app')
);