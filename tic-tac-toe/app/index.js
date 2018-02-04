/*
 * @Author: Denzel 
 * @Date: 2018-02-01 10:17:27 
 * @Last Modified by:   Denzel 
 * @Last Modified time: 2018-02-04 10:17:27 
 */

import React from 'react'

import { render } from 'react-dom'

import  './css/index.scss';
import {Game} from './component/'

render(
    <Game />,
    document.getElementById('app')
);