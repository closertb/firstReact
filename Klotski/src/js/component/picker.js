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
    return (
        <li className="item" style={props.str}>
            {props.value}
        </li>
    );
}

export default class Picker extends React.Component {
    constructor(props){
        super(props);
        this.eve ={
            status:props.status,
            type:'none',
            level:props.level,
            pointer:{
                start:props.position,
                end:props.position,
                xPos:0
            }
        };
        this.startListen = this.startListen.bind(this);
    }
    startListen(e){

            /*this.eve.pointer.end =this.getPos(e).y;
            this.moveDistance(this.eve.pointer);
            this.eve.status = false;*/
        this.props.event(this.props.level,this.getPos(e).y)
    }
    getPos(e){
        return {
            x:e.screenX || e.changedTouches[0].pageX,
            y:e.screenY || e.changedTouches[0].pageY,
        }
    };
    render(){
        if(this.props.data && this.props.data.length ===0 ){
            return null
        }
        const itemList = this.props.data.map((t,index)=>{
            let diff = Math.abs(this.props.index - index),styleStr={};

            if(diff<3){
                styleStr = {
                    transform: 'rotateX('+diff*25+'deg)'
                };
                return (<Item value={t} isCurry={!diff} key={t} str={styleStr}/>);
            }
            return (<Item value={t}  key={t} str={styleStr}/>)
        })
        const styleStr = {
            transform: 'translate(0,'+(2-this.props.index)*35+'px)'
        };

        return (
                <div className="picker-content"
                     onMouseDown={(e)=>{e.preventDefault();this.startListen(e)}}
                     onTouchStart={(e)=>{e.preventDefault();this.startListen(e)}}
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
            </div>)
    }
}