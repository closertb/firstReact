/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 21:47
 * @version 1.0
 * Description:
 */
import React from 'react';
import {render} from 'react-dom';
import CommonPicker,{ CityPicker, DatePicker, TimePicker } from './lib/pickers';
import '../css/index.scss';

/**
* picker组件测试程序
* */
class Treat extends React.Component{
    constructor(){
        super();
        this.state ={
            showPicker:[false,false,false,false],
            res:['','','',''],
            workId:'',
        };
        this.selectIndex = this.selectIndex.bind(this);
        this.showPicker = this.showPicker.bind(this);
        this.closePicker = this.closePicker.bind(this);
        //this.showLog = this.showLog.bind(this);
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
    componentDidMount(){
        
    }
    render(){
        const wordData = ['sb','fu','ck','nb'];
        const params = {
            area:'青羊区'
        };
        return (
            <div className="home-page">
                <span>{ this.state.val }</span>
                <ul className="level-items">
                    <li onClick={()=>{this.showPicker(0)}}>
                        <span>省市区选择：</span>
                        <label>{this.state.res[0]}</label>
                    </li>
                    <li onClick={()=>{this.showPicker(2)}}>
                        <span>两项选择：</span>
                        <label>{this.state.res[2]}</label>
                    </li>
                    <li onClick={()=>{this.showPicker(3)}}>
                        <span>日期选择：</span>
                        <label>{this.state.res[3]}</label>
                    </li>
                    <li onClick={()=>{this.showPicker(1)}}>
                        <span>时间选择：</span>
                        <label>{this.state.res[1]}</label>
                    </li>
                </ul>
                <a href="http://closertb.site/" className="about">
                    <svg>
                        <use xlinkHref="#aboutIcon"></use>
                    </svg>
                </a>
                <CityPicker
                    selectHandle={this.selectIndex}
                    isShow={this.state.showPicker[0]}
                    closeHandle={this.closePicker}
                    initState = {params}
                />
                <CommonPicker sources ={[{index:2,data:[1,2,3,4]},{index:2,data:wordData}]}
                title = "通用选择器"
                         selectHandle={this.selectIndex}
                         isShow={this.state.showPicker[2]}
                         closeHandle={this.closePicker}
                />
                <DatePicker 
                    title="日期选择器"
                    initState = {params}
                    selectHandle={this.selectIndex}
                    isShow={this.state.showPicker[3]}
                    closeHandle={this.closePicker}
                />
                <TimePicker 
                    title="时间选择器"
                    initState = {params}
                    selectHandle={this.selectIndex}
                    isShow={this.state.showPicker[1]}
                    closeHandle={this.closePicker}
                />                
            </div>
        )
    }
}
render((
    <Treat />
), document.getElementById('app'));
