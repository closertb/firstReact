/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-05 21:35
 * @version 1.0
 * Description:
 */

import React from 'react';
import Pickers from '../component/pickers';


export default class CityPicker extends React.Component {
    constructor() {
        super();
        this.selectIndex = this.selectIndex.bind(this);
        this.showPicker = this.showPicker.bind(this);
        this.closePicker = this.closePicker.bind(this);
        this.state = {
            showPiker: true
        }
    }

    selectIndex(e) {
       // console.log(e);
    }

    closePicker() {
        this.setState({showPiker: false})
    }

    showPicker() {
        this.setState({showPiker: true})
    }

    render() {
        const listData = [1,2,3,4,5,6,7,8,9];
        const wordData = ['sb','fu','ck','nb','gwz'];
        const sources =[{index:2,data:listData},
            {index:1,data:wordData},
            {index:5,data:listData}] ;
        const params = {
            isCityPicker:true,
            area:'青羊区'
        };
        return (
            <div className="city-picker">
                <h1>城市三级联动选择器</h1>
                <button onClick={this.showPicker}>更<span>多...</span></button>
                <Pickers sources ={sources}
                         selectHandle={this.selectIndex}
                         isShow={this.state.showPiker}
                         closeHandle={this.closePicker}
                         cityPicker = { params }
                />
            </div>
        );
    }
}