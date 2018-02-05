/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 21:47
 * @version 1.0
 * Description:
 */
import '../css/index.scss';

import React from 'react';
import {render} from 'react-dom'

import Game from './page/game';
import Simple from "./page/simple";


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
    <Simple />,
    document.getElementById('app')
);