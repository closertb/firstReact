/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 21:47
 * @version 1.0
 * Description:
 */
import React from 'react';
import { render } from 'react-dom';
import { Upload, Icon, message } from 'antd';
import 'antd/dist/antd.css';
import '../css/index.scss';

class ClipCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imgUrl: props.url };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    // const { imgUrl } = this.state;
    this.ctx = this.target.getContext('2d');
    // const ctx = this.ctx;
    // ctx.fillStyle = '#9e9e9e';
    /* eslint-disable no-undef */
  /*     const img = new Image(imgUrl);
    img.onload = () => {
      console.log('ok', img);
      const pattern = ctx.createPattern(img, 'no-repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, 300, 400);
    };
    img.src = imgUrl; */
  }
/*   beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  } */
  handleChange(file) {
    // Get this url from response in real world.
    const { files } = file.target;
    if (files && files[0]) {
      const reader = new FileReader();
      // const ctx = this.ctx;
      reader.onload = (e) => {
        /* const pattern = ctx.createPattern(img, 'no-repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, 0, 300, 400); */
        console.log('file', e.target);
        /* eslint-disable no-undef */
        const img = new Image();
        img.onload = (e) => {
          const { width, height } = e.path[0];
          console.log('ok', width, height);
        };
        img.src = e.target.result;
        this.setState({ imageUrl: e.target.result });
      };
      reader.readAsDataURL(files[0]);
    }
/*       getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      })); */
  }
  render() {
    const { width = 300, height = 400, imageUrl, loading } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
{/*         <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
        </Upload> */}
        <input type="file" onChange={this.handleChange} />
        {imageUrl ? <img src={imageUrl} style={{ width: '200px', height: '200px' }} alt="" /> : uploadButton}
        <canvas ref={e => this.target = e} width={width} height={height} />
      </div>
    );
  }
}

render((
  <ClipCanvas url="http://sfault-image.b0.upaiyun.com/267/302/2673022103-5a9b6eab40960_articlex" />
), document.getElementById('app'));
