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

function Item(props) {
    const classItem = props.isCurry ? 'item curry' : 'item';
    return (
        <li className={classItem} >
            {props.value}
        </li>
    );
}

export default class Picker extends React.Component {
    constructor(props){
        super(props);
        this.eve ={
            status:false,
            type:'none',
            pointer:{
                start:0,
                end:0,
                xPos:0
            }
        }
        this.listData = [3,4,5,6,7,8,9];
        this.state ={
            top:12,  //距上边缘的距离
            index:3  //当前选中元素
        };
        this.maxTop=200; //距上边缘最大移动值
        this.eventListen = this.eventListen.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
    }
    eventListen(e){
        var type = e.type;
        if(type === 'mousedown' || type === 'touchstart' ){
            var pos =  this.getPos(e);
            this.eve.status = true;
            this.eve.pointer.end =pos.y;
            this.eve.pointer.xPos =pos.x;
            this.eve.pointer.start =this.eve.pointer.end =pos.y;
        }
        if(type === 'mouseup' || type === 'touchend'  ){
            this.eve.pointer.end =this.getPos(e).y;
            this.moveDistance(this.eve.pointer);
            this.eve.status = false;
        }
    }
    handleClick(){
        this.props.selectHandle(this.listData[this.state.index-1]);
        this.props.closeHandle();
    }
    cancelClick(){
        console.log('cancel');
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
        let md =pointer.start - pointer.end,top=0;
        if( Math.abs(md)<5){
            return ;
        }
        top= top - md;

        let newIndex = this.state.index - Math.round(top/35);
        if(newIndex< 1){
            newIndex =1;
        }
        if(newIndex>this.listData.length){
            newIndex = this.listData.length
        }
        this.setState({
            index:newIndex
        });
    }
    render(){
        const itemList = this.listData.map((t,index)=>{
            return (<Item value={t} isCurry={index===(this.state.index-1)} key={t}/>)
        })
        const styleStr = {
            transform: 'translate(0,'+(3-this.state.index)*35+'px)'
        }
        const isShowModule = this.props.isShow ? 'picker-module':'picker-module none'
        return (
            <div className={isShowModule}
                 onMouseUp={(e)=>{this.eventListen(e)}}
                 onTouchEnd={(e)=>{this.eventListen(e)}}
            >
                <div className="piker-shadow"></div>
                <div className="button-bar">
                    <span className="btn-cancel" onClick={this.cancelClick}>取消</span>
                    <span className="select-name">选择阶数</span>
                    <span className="btn-sure" onClick={this.handleClick}>确定</span>
                </div>
                <div className="picker-content"
                     onMouseDown={(e)=>{e.preventDefault();this.eventListen(e)}}
                     onTouchStart={(e)=>{e.preventDefault();this.eventListen(e)}}
                >
                    <ul className="opacity-layer">
                        <li></li>
                        <li></li>
                        <li className="curry"></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul className="select-list" style={styleStr}>
                        {itemList}
                    </ul>
                </div>
            </div>)
    }
}