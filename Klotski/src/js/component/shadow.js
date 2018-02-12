/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-07 21:48
 * @version 1.0
 * Description:
 */
import React from 'react';
import {Link} from 'react-router-dom';

export default function ShadowBox(props) {
    const jokers ={
        '3':[20000,60000,100000],
        '4':[40000,120000,200000],
        '5':[100000,600000,1000000]

    },path={
        pathname: '/simple',
        query: {
            level: props.level
        }
    };
    let word ='';
    if(props.isSuccess){
        console.log('pass',props.timePass);
        const records = jokers[props.level];
        if(props.timePass < records[0]){
            word ='大神啊，快膜拜 ！';
        }else if(props.timePass > records[2]){
            word ='再不勤奋，就晚了！';
        }else{
            word ='再撸一把，超越自己！';
        }
        const date = new Date();
        if(date.getHours()>23){
            word ='该睡了，明天再战！';
        }
        return (
            <div className="shadow-box show-success">
                <div className="vertical-box">
                    <div className="show-level"><span>数字华容道{props.level + 'x' + props.level}</span></div>
                    <div className="show-time">
                        <span className="middle-left">
                            <div>用时：{props.time}</div>
                            <div>步数：{props.step}</div>
                        </span>
                    </div>
                    <div className="shadow-info"><span>{word}</span></div>
                    <div className="shadow-event">
                        <Link to="/"><span className="home-button"></span></Link>
                        <Link to={path}><span className="more-button"></span></Link>
                        <span className="share-button" ></span>
                    </div>
                </div>
            </div>);
    }else if(props.isShow){
        return (
            <div className="shadow-box">
                <div className="vertical-box">
                    <div className="shadow-info"><span>暂停</span></div>
                    <div className="shadow-event">
                        <Link to="/"><span className="home-button"></span></Link>
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