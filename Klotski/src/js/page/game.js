/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 21:20
 * @version 1.0
 * Description:
 */
import React from 'react';
import Block from '../component/block';
import ShadowBox from '../component/shadow';
import {randomArr, getTargetState,evenInverseNumber} from '../util/util';
import {Link} from 'react-router-dom';

function Status(props) {
    const formatter=(t)=>{
        const res =t>9 ? t : '0'+t;
        return res;
    }
    if(props.isSuccess){
        return (
            <div className="show-status success-status">成功了</div>
        );
    }else{
        return (
            <div className="show-status">{props.value} <span className="total-step">{formatter(props.step)}</span></div>
        );
    }

}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.level = this.props.location.query.level;
        this.length = this.level * this.level;
        this.state = {
            success: false,
            level: this.level,
            time:'00:00:00',
            timePass:0,
            step:0,
            squares: evenInverseNumber(this.level),
            showShadow:false
        };
        this.handleClick = this.handleClick.bind(this);
        this.pauseClick = this.pauseClick.bind(this);
        this.startClick = this.startClick.bind(this);
        this.resetClick = this.resetClick.bind(this);
        let size = Math.min(window.innerWidth-20,window.innerHeight);
        this.blockSize = Math.floor(size/60)*60;
    }
    componentDidMount() {
        this.timer(0);
    }
    timer(offsetTime){
        const formatter=(t)=>{
            const res =t>9 ? t : '0'+t
            return res;
        }
        let startTime = new Date().getTime(),tPass=0,tOffset=offsetTime||0;
        this.interId = setInterval(()=> {
            let tNew = new Date().getTime(),ms,sec,min,timeStr;
            tPass = tOffset +tNew - startTime;
            ms = Math.floor(tPass/10 % 100);
            sec = Math.floor((tPass / 1000) % 60);
            min = Math.floor((tPass / 1000 / 60) % 60);
            timeStr = formatter(min)+':'+formatter(sec)+':'+formatter(ms);
            this.tick(timeStr,tPass);
        },100)
    }
    componentWillUnmount() {
        clearInterval(this.interId);
    }
    tick(timeStr,tPass){
        this.setState({
            timePass:tPass,
            time:timeStr
        })
    }
    handleClick(dir, index) {
        const squares = this.state.squares.slice();
        const newIndex = getTargetState(this.level, index, dir);
        if (newIndex === index || squares[newIndex] !== 0) {
            return;
        }
        let temp = squares[index];
        squares[index] = squares[newIndex];
        squares[newIndex] = temp;
        var isSuccess = squares.every((t, index) => {
            return t === (index + 1)%this.length;
        });
        if (isSuccess) {
            clearInterval(this.interId);
            this.setState({
                squares: squares,
                success: true,
                step:this.state.step+1
            });
        } else {
            this.setState({
                squares: squares,
                step:this.state.step+1
            });
        }
    };
    pauseClick(){
        clearInterval(this.interId);
        this.setState({
            showShadow:true
        });
    }
    startClick(){
        this.setState({
            showShadow:false
        });
        this.timer(this.state.timePass);
    }
    resetClick(){
        this.setState({
            showShadow:false,
            time:'00:00:00',
            timePass:0,
            step:0,
            level:this.level,
            squares:evenInverseNumber(this.level)
        });
        this.timer(0);
    }
    render() {
        return (
            <div className="game-box">
                <Status value={this.state.time}
                        isSuccess={this.state.success}
                        step ={ this.state.step}
                />
                <Block
                    handle={this.handleClick}
                    level={this.state.level}
                    squares={this.state.squares}
                    size = {this.blockSize}
                    simple ={false}
                />
                <ShadowBox
                    isShow ={ this.state.showShadow }
                    isSuccess = {this.state.success }
                    level={this.state.level}
                    time ={this.state.time}
                    timePass = {this.state.timePass}
                    step = {this.state.step}
                    pauseHandle = { this.pauseClick }
                    startHandle ={ this.startClick}
                    resetHandle ={ this.resetClick}
                />
            </div>
        );
    }
}