/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 21:20
 * @version 1.0
 * Description:
 */
import React from 'react';
import Block from '../component/block';
import {disorganize, getTargetState, timer} from '../util/util';

const level = 5,length=level*level;

function Status(props) {
    const className = props.isSuccess ? 'show-status success-status' : 'show-status';
    const str =  props.isSuccess ? '成功了':props.value;
    return (
        <div className={className}>{str}</div>
    );
}
function ShadowBox(props) {
    if(props.isShow){
        return (
            <div className="shadow-box">
                <div className="vertical-box">
                    <div className="shadow-info"><span>暂停</span></div>
                    <div className="shadow-event">
                        <span className="home-button"></span>
                        <span className="start-button" onClick={props.startHandle}></span>
                        <span className="reset-button" onClick={props.resetHandle}></span>
                    </div>
                </div>
            </div>);
    }else{
       return (
           <div className="stop-button" onClick={props.pauseHandle}></div>
       );
    }

}
export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            success: false,
            level: level,
            time:'00:00:00',
            timePass:0,
            squares: disorganize(level),
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
        const newIndex = getTargetState(level, index, dir);
        if (newIndex === index || squares[newIndex] !== 0) {
            return;
        }
        let temp = squares[index];
        squares[index] = squares[newIndex];
        squares[newIndex] = temp;
        var isSuccess = squares.every((t, index) => {
            return t === (index + 1)%length;
        });

        if (isSuccess) {
            clearInterval(this.interId);
            this.setState({
                squares: squares,
                success: true
            });
            console.log(this.state.time);
        } else {
            this.setState({
                squares: squares
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
        console.log('click:reset');
        this.setState({
            showShadow:false,
            time:'00:00:00',
            timePass:0,
            squares:disorganize(level)
        });
        this.timer(0);
    }
    render() {
        return (
            <div className="game-box">
                <Status value={this.state.time} isSuccess={this.state.success}/>
                <Block
                    handle={this.handleClick}
                    level={this.state.level}
                    squares={this.state.squares}
                    size = {this.blockSize}
                />
                <ShadowBox
                    isShow ={ this.state.showShadow }
                    isSuccess = {this.state.success }
                    pauseHandle = { this.pauseClick }
                    startHandle ={ this.startClick}
                    resetHandle ={ this.resetClick}
                />
            </div>
        );
    }
}