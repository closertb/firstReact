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

import {Icons} from './component/icon';
import Pickers from './component/pickers';


/*
export default class Game extends React.Component {

}*/


/**
* picker组件测试程序
* */
class Treat extends React.Component{
    constructor(){
        super();
        this.state ={
            showPicker:[false,false,false,false],
            res:['','','',''],
            workId:''
        };
        this.selectIndex = this.selectIndex.bind(this);
        this.showPicker = this.showPicker.bind(this);
        this.closePicker = this.closePicker.bind(this);
    }
    closePicker() {
        this.setState({showPicker:[false,false,false,false]})
    }
    showPicker(id) {
        const choice = [false,false,false,false];
        choice[id] = true;
        this.setState({showPicker: choice,workId:id});
    }
    selectIndex(e) {
        const id = this.state.workId;
        const res = this.state.res;
        res[id] = e.join('-');
        this.setState({showPicker:[false,false,false,false],res:res});
    }
    render(){
        const wordData = ['sb','fu','ck','nb','gwz'];
        const params = {
            isCityPicker:true,
            area:'青羊区'
        };
        return (
            <div className="home-page">
                <Icons/>
                <ul className="level-items">
                    <li onClick={()=>{this.showPicker(0)}}>
                        <span>城市选择：</span>
                        <label>{this.state.res[0]}</label>
                    </li>
                    <li onClick={()=>{this.showPicker(1)}}>
                        <span>普通选择：</span>
                        <label>{this.state.res[1]}</label>
                    </li>
                    <li onClick={()=>{this.showPicker(2)}}>
                        <span>两项选择：</span>
                        <label>{this.state.res[2]}</label>
                    </li>
                    <li onClick={()=>{this.showPicker(3)}}>
                        <span>三项选择：</span>
                        <label>{this.state.res[3]}</label>
                    </li>
                </ul>
                <a href="http://closertb.site/" className="about">
                    <svg>
                        <use xlinkHref="#aboutIcon"></use>
                    </svg>
                </a>
                <Pickers selectHandle={this.selectIndex}
                         isShow={this.state.showPicker[0]}
                         closeHandle={this.closePicker}
                         cityPicker = { params }
                />
                <Pickers sources ={[{index:2,data:[1,2,3,4,5,6,7,8,9]}]}
                         selectHandle={this.selectIndex}
                         isShow={this.state.showPicker[1]}
                         closeHandle={this.closePicker}
                />
                <Pickers sources ={[{index:2,data:[1,2,3,4,5,6,7,8,9]},{index:4,data:wordData}]}
                         selectHandle={this.selectIndex}
                         isShow={this.state.showPicker[2]}
                         closeHandle={this.closePicker}
                />
                <Pickers sources ={[{index:2,data:[1,2,3,4,5,6,7,8,9]},{index:4,data:wordData},{index:1,data:wordData}]}
                         selectHandle={this.selectIndex}
                         isShow={this.state.showPicker[3]}
                         closeHandle={this.closePicker}
                />
            </div>
        )
    }
}
render((
    <Treat />
), document.getElementById('app'));
