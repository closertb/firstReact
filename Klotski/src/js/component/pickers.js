/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-11 22:51
 * @version 1.0
 * Description:
 */
/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-11 18:40
 * @version 1.0
 * Description:
 */
import React from 'react';
import Picker from './picker'
import {city} from '../util/city';
/**
 * 作用：改写ES5 ARRAY的some方法
 * 区别：这个当存在时，返回的数值不是true，而是其所在的索引值
 * @param  {[function]}   callback 回调函数
 * */
Array.prototype.someIndex = function (callback) {
    var res ='';
    for(var i=0;i<this.length;i++){
        var res = callback(this[i],i,this);
        if(res){
            res = i ;
            break;
        }
        res = '';
    }
    return res;
};
export default class Pickers extends React.Component {
    constructor(props){
        super(props);
        let isCityPicker = props.cityPicker && props.cityPicker.isCityPicker;
        this.eve ={
            status:false,
            isCityPicker:isCityPicker,
            type:'none',
            level:0,
            pointer:{
                start:0,
                end:0
            }
        };
        this.state ={
            status:false,
            position:0,
            sources: isCityPicker ? this.getCitySource(props.cityPicker) : props.sources
        };
        this.eventListen = this.eventListen.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.callBack = this.callBack.bind(this);
    }
    eventListen(e){
        this.eve.pointer.end =this.getPos(e).y;
        this.moveDistance(this.eve.pointer);
        this.eve.status = false;
    }
    callBack(level,pos){
        this.eve.level = level;
        this.eve.status = true;
        this.eve.pointer.start = pos;
        this.eve.pointer.end = pos;
    }
    handleClick(){
        const res = this.state.sources.map((t,index)=>{
            return t.data[t.index];
        });
        console.log(res);
        this.props.selectHandle(res);
        this.props.closeHandle();
    }
    cancelClick(){
        this.props.closeHandle();
    }
    getPos(e){
        return {
            x:e.screenX || e.changedTouches[0].pageX,
            y:e.screenY || e.changedTouches[0].pageY,
        }
    };
    moveDistance(pointer){
        if(!this.eve.status){
            return ;
        }
        let sources = this.state.sources.slice(),target = sources[this.eve.level];

        let md =pointer.start - pointer.end,top=0;
        if( Math.abs(md)<5){
            return ;
        }
        top= top - md;

        let newIndex = target.index - Math.round(top/35);
        if(newIndex< 0){
            newIndex =0;
        }
        if(newIndex>(target.data.length-1)){
            newIndex = target.data.length-1;
        }
        if(this.eve.isCityPicker && this.eve.level<2){
            if(this.eve.level){
                sources[1].index = newIndex;
                sources[2].data = city[sources[0].index].sub[sources[1].index].sub.map((t)=>{
                    return t.name ;
                });
                sources[2].index = 0;
            }else{
                sources = this.getCitySource({province:sources[0].data[newIndex]});
            }
        }else{
            sources[this.eve.level].index = newIndex;
        }

        this.setState({sources:sources});
    }
    getCitySource(params){
        //索引省对应的索引
        let index = '';
        const provinceItem = {index:'',data:[]},cityItem = {index:'',data:[]},areaItem = {index:'',data:[]};
        provinceItem.data = city.map((t)=>{
            return t.name ;
        });
        //索引市对应的索引
        if(params.province && params.province !==''){
            const index =  this.searchIndex('name',params.province,city);
            if(index !==''){
                provinceItem.index = index;
            }
        }

        //索引市对应的索引
        if(params.city && params.city !==''){
            const queryArr = provinceItem.index ==='' ? city : city[provinceItem.index].sub;
            const index = this.searchIndex('name',params.city,queryArr);
            if(index instanceof Array){
                provinceItem.index = index[0];
                cityItem.index = index[1];
            }else if(index !==''){
                cityItem.index = index;
            }
        }

        //索引区对应的索引
        if(params.area && params.area !==''){
            const queryArr = cityItem.index ==='' ? city : city[provinceItem.index].sub[cityItem.index].sub;
            const index = this.searchIndex('name',params.area,queryArr);
            if(index instanceof Array){
                provinceItem.index = index[0];
                cityItem.index = index[1];
                areaItem.index = index[2];
            }else if(index !==''){
                areaItem.index = index;
            }else{
                provinceItem.index = 0;
                cityItem.index = 0;
                areaItem.index = 0;
            }
        }
        if(!params.city){
            cityItem.index = 0;
        }
        if(!params.area){
            areaItem.index = 0;
        }
        cityItem.data = city[provinceItem.index].sub.map((t)=>{
            return t.name ;
        });
        areaItem.data = city[provinceItem.index].sub[cityItem.index].sub.map((t)=>{
            return t.name ;
        });
        return [provinceItem,cityItem,areaItem];
    }
    /**
     * 作用：根据查询的名字，取出对应的索引值
     * @params {[string]} attr    [查询的属性，region,name]
     * @params {[string]} value   [查询的值]
     * @params {[ARRAY]} arr      [被查询的数组]
     * 返回值：index
     *         未查到对应值;为空
     *         一级索引查询到;返回单个数值
     *         二级索引查询到;返回长度为2的数组
     *         三级索引查询到;返回长度为3的数组
     * */
    searchIndex(attr,value,arr) {
        var index='';
        index = arr.someIndex((t)=>{  //省级查询
            return t[attr] === value ;
        });
        if(index ===''){  //市级查询
            for(var i=0;i<arr.length;i++){
                index = arr[i].sub ? arr[i].sub.someIndex((t) => {
                    return t[attr] === value ;
                }):'';
                if(index !==''){
                    index = [i,index];
                    break;
                }
            }
        }
        if(index ===''){  //区级查询
            for(i=0;i<arr.length;i++){
                var temp = arr[i].sub;
                for(var j=0;j<temp.length;j++){
                    index = temp[j].sub ? temp[j].sub.someIndex((t) => {
                        return t[attr] === value ;
                    }):'';
                    if(index !==''){
                        break;
                    }
                }
                if(index !==''){
                    index = [i,j,index];
                    break;
                }
            }
        }
        return index;
    }
    render(){
        const PickerList = this.state.sources.map((t,index)=>{
            return (<Picker level={index} data={t.data} index={t.index} key={index} position = {this.state.position}  status = {this.state.status} event ={this.callBack}/>)
        });
        const isShowModule = this.props.isShow ? 'picker-module':'picker-module none'
        return (
            <div className={isShowModule}
                 onMouseUp={(e)=>{this.eventListen(e)}}
                 onTouchEnd={(e)=>{this.eventListen(e)}}
            >
                <div className="piker-shadow"></div>
                <div className="button-bar">
                    <span className="btn-cancel" onClick={this.cancelClick}>取消</span>
                    <span className="select-name">{this.props.title || '选择'}</span>
                    <span className="btn-sure" onClick={this.handleClick}>确定</span>
                </div>
                <div className="picker-contents">
                    { PickerList }
                </div>
            </div>)
    }
}