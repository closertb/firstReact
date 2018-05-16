/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 21:47
 * @version 1.0
 * Description:
 */
import React from 'react';
import { render } from 'react-dom';

class ClipCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imgUrl: props.url };
  }
  componentDidMount() {
    const { imgUrl } = this.state;
    this.ctx = this.target.getContext('2d');
    const ctx = this.ctx;
    ctx.fillStyle = '#9e9e9e';
    const img = new Image(imgUrl);
    img.onload = () => {
      console.log('ok', img);
      const pattern = ctx.createPattern(img, 'no-repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, 300, 400);
    };
    img.src = imgUrl;
  }
  render() {
    const { width = 300, height = 400 } = this.state;
    return (
      <div>
        <canvas ref={e => this.target = e} width={width} height={height} />
      </div>
    );
  }
}

render((
  <ClipCanvas url="http://sfault-image.b0.upaiyun.com/267/302/2673022103-5a9b6eab40960_articlex" />
), document.getElementById('app'));
