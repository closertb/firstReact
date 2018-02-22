/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-05 22:57
 * @version 1.0
 * Description:
 */
import React from 'react';
import {Link} from 'react-router-dom';

import Picker from "../component/picker";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.selectIndex = this.selectIndex.bind(this);
        this.showPicker = this.showPicker.bind(this);
        this.closePicker = this.closePicker.bind(this);
        this.state = {
            showPiker: false
        }
    }

    selectIndex(e) {
        const path = '/simple?level=' + e;
        this.props.history.push(path);
    }

    closePicker() {
        this.setState({showPiker: false})
    }

    showPicker() {
        this.setState({showPiker: true})
    }

    render() {
        return (
            <div className="home-page">
                <h3><span>欢迎来到</span></h3>
                <h2><span>数字华容道</span></h2>
                <ul className="level-items">
                    <li><Link to='/simple?level=3'>3x3</Link></li>
                    <li><Link to='/simple?level=4'>4x4</Link></li>
                    <li><Link to='/simple?level=5'>5x5</Link></li>
                    <li onClick={this.showPicker}>更<span>多...</span></li>
                </ul>
                <a href="http://closertb.site/" className="about">
                    <svg>
                        <use xlinkHref="#aboutIcon"></use>
                    </svg>
                </a>
                <Picker selectHandle={this.selectIndex} isShow={this.state.showPiker} closeHandle={this.closePicker}/>
            </div>);
    }
};