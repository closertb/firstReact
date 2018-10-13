/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-04 10:46
 * @version 1.0
 * Description:
 */

import React from 'react';
import {pointer} from '../util/util';

export default class Square extends React.Component {
    shouldComponentUpdate(nextProps) {
      if(nextProps.update) {
        return true;
      }
      return false;
    }
    render() {
      const props = this.props;
      const { prop, level, size } = this.props;
      const { value, index } = prop;
      const  offsetSize = size + 2;
      const styleStr = value === 0 ? { display: 'none' } : {
        width: size,
        height: size,
        transform: 'translate(' + offsetSize * (index % level) + 'px,' + offsetSize * Math.floor(index / level) + 'px)'
      }
      return (
        <li
          className="square"
          style={styleStr}
          onSelect={(e) => { e.preventDefault(); }}
          onMouseDown={(e) => { e.preventDefault(); pointer.listen(e, null, prop) }}
          onTouchStart={(e) => { e.preventDefault(); pointer.listen(e, null, prop) }}
        >
          <span>{value}</span>
        </li>
      ); 
    }
}