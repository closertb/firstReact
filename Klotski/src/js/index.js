/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-01 21:47
 * @version 1.0
 * Description:
 */
import '../css/index.scss';

import React from 'react';
import {render} from 'react-dom'

import Game from './component/game';


/*
export default class Game extends React.Component {

}*/
const handleClick = (index, value) => {
    console.log('posOld:',index, value);
    const newIndex = getTargetState(level,index,'up');
    if(newIndex === index){
        console.log('not change');
        return ;
    }
    let temp = squares[index];
    squares[index] = squares[newIndex];
    squares[newIndex] = temp;
    console.log('posNew:',newIndex);
};

render(
    <Game />,
    document.getElementById('app')
);