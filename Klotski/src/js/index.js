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
    return index;
});
const handleClick =(e)=>{
        console.log(e);
};
const util ={
    disorganize:(length)=>{
        const arr= [];
        let temp ;
        for(var i= 0;i<length;i++){
            arr.push(i);
        }
        for(i= 0;i<length;i++){
            let random = Math.round(Math.random()*(length-1));
            temp = arr[random];
            arr[random] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
}

render(
    <Block onClick={handleClick} squares = {util.disorganize(9)}/>,
    document.getElementById('app')
);