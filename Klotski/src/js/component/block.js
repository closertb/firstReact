/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 22:17
 * @version 1.0
 * Description:
 */
import React from 'react';
import Square from './square';
import { pointer, getTargetState} from "../util/util";

export default class Block extends React.Component{
    constructor(props){
        super(props);
        this.size = this.props.size / this.props.level ;
        this.boxSize = this.props.size + Number(this.props.level) + 1;
        this.handleEvent = this.handleEvent.bind(this);
        const zeroIndex = props.squares.indexOf(0);
        this.state = {
          squares: props.squares.map((t, index) => ({ 
            value: t,
            originIndex: index,
            index,
          })),
          zeroIndex,
          blankIndex: zeroIndex,
          newIndex: undefined,
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.update || nextState.update) {
        return true;
      }
      return false;
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.update) {
        this.setState({ update: false });
      }
    }
    handleEvent(dir, prop) {
      const { originIndex: index, index: nowIndex } = prop;
      if (this.props.simple || dir === 'none') {
        return;
      }
      const { zeroIndex, squares: quars, blankIndex } = this.state;
      const squares = quars.slice();
      const newIndex = getTargetState(this.props.level, nowIndex, dir);
      // 判断滑动的下一个位置为空方块 newIndex === squares[zeroIndex].index 
      if (newIndex === nowIndex || newIndex !== blankIndex) {
        return;
      }
      let temp = squares[index].index; // 取出被滑动块当前的索引值
      squares[index].index = newIndex; // 更新被滑动块当前的索引值
      squares[zeroIndex].index = temp; // 更新空白块(值为0)的索引值
      this.setState({ squares, update: true, newIndex, blankIndex: temp });
      this.props.handle(squares);
    };
    renderSquare(prop, i) {
        const { update } = this.state;
        const { value, index } = prop;
        const needUpdate = update && (index === this.state.newIndex || value === 0);
        return (
            <Square
                prop={prop}
                key={i}
                level={this.props.level}
                size={this.size}
                update={needUpdate}
            />
        );
    }
    render() {
        const _this = this;
        const listItems = this.state.squares.map(function(t,index){
            return _this.renderSquare(t,index);
        });
        const className = this.props.simple ? 'widget-block add-filter':'widget-block';
        const styleStr ={
            width:this.boxSize+"px",
            height:this.boxSize+"px"
        };
        return (
            <ul className={className}
                style={styleStr}
                size ={this.size}
                onSelect = {()=>{return false;}}
                onMouseUp={(e)=>{pointer.listen(e,this.handleEvent)}}
                onTouchEnd={(e)=>{pointer.listen(e,this.handleEvent)}}
            >
                {listItems}
            </ul>
        );
    }
}