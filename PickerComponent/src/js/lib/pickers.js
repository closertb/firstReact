/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-11 22:51
 * @version 1.0
 * Description:
 */
import React from 'react';
import {
  city
} from '../util/city';

const LineHeight = 40;
const InitMarginTop = 2 * LineHeight;
const RollingAngle = -30;
const DaySeconds = 1000 * 60 * 60 * 24;
const getMaxDate = (year, month) => {
  let newYear = year; // 取当前的年份
  /* eslint-disable no-plusplus */
  let newMonth = month + 1; // 取下一个月的第一天，方便计算（最后一天不固定)
  if (month > 12) { // 如果当前大于12月，则年份转到下一年
    newMonth -= 12; // 月份减
    newYear += 1; // 年份增
  }
  const newDate = new Date(newYear, newMonth, 1); // 取当年当月中的第一天
  return (new Date(newDate.getTime() - DaySeconds)).getDate(); // 获取当月最后一天日期
};
const TimeScale = (new Array(60)).fill(1).map((item, index) => index < 10 ? `0${index}` : `${index}`);
const HourScale = is24Hour => new Array(12 + (12 * is24Hour)).fill(1).map((item, index) =>
  index < 10 ? `0${index}` : `${index}`);
/**
 * 作用：改写ES5 ARRAY的some方法
 * 区别：当这个值存在数组中时，返回的数值不是true，而是其所在的索引值
 * @param  {[function]}   callback 回调函数
 * */
/* eslint-disable no-extend-native */
Array.prototype.someIndex = (callback) => {
  let res = '';
  /* eslint-disable no-plusplus */
  for (let i = 0; i < this.length; i++) {
    res = callback(this[i], i, this);
    if (res) {
      res = i;
      break;
    }
    res = '';
  }
  return res;
};

/**
 * fun: 获取当前时刻的时间戳
 */
const getTimeStamp = () => (new Date()).getTime();
/**
 * fun: 计算绝对值
 * @param {number} data 要计算的值
 */
const Abs = data => Math.abs(data);

/**
 * fun:
 */
const getPos = e => ({
  x: e.screenX || e.changedTouches[0].pageX,
  y: e.screenY || e.changedTouches[0].pageY,
});
/**
 * fun: 无状态组件，触摸列表最小单元
 * @param {Object} props 元素的属性集
 */
const AddMarginTop = sources => sources.map((item) => {
  const marginTop = InitMarginTop - (item.index * LineHeight);
  return {
    ...item,
    marginTop
  };
});
function Item(props) {
  const { str, value } = props;
  return (
    <li className="item" style={str}>
      {value}
    </li>
  );
}
/**
 * fun: 无状态组件，触摸列表元素
 * @param {Object} props 元素的属性集
 */
function PickerItem(props) {
  const { data, onStartListen, selectIndex, level, marginTop } = props;
  if (data && data.length === 0) {
    return null;
  }
  const itemList = data.map((t, index) => {
    const diff = selectIndex - index;
    let styleStr = {};
    if (Abs(diff) < 4) {
      styleStr = {
        transform: `rotateX(${diff * RollingAngle}deg)`
      };
      return (<Item value={t} isCurry={!diff} key={t} str={styleStr} />);
    }
    return (<Item value={t} key={t} str={styleStr} />);
  });
  const styleStr = {
    transform: `translate(0,${marginTop}px)`
  };

  return (
    <div
      className="picker-content"
      onMouseDown={e => onStartListen(e, level)}
      onTouchStart={e => onStartListen(e, level)}
    >
      <ul className="opacity-layer">
        <li />
        <li />
        <li className="curry" />
        <li />
        <li />
      </ul>
      <ul className="select-list" style={styleStr}>
        {itemList}
      </ul>
    </div>);
}

class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.eve = {
      status: false,
      isDraging: false,
      level: 0,
      startTime: 0,
      startPos: 0
    };
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.onStartListen = this.onStartListen.bind(this);
    this.onMoveListen = this.onMoveListen.bind(this);
    this.onEndListen = this.onEndListen.bind(this);
  }
  componentDidMount() {
    const target = document.querySelector('.js-picker-module');
    target.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, false);
  }
  onStartListen(e, level) {
    const point = getPos(e).y;
    this.eve = {
      level,
      status: true,
      startPos: point,
      isDraging: false,
      startTime: getTimeStamp()
    };
  }
  onMoveListen(e) {
    const { startPos, startTime } = this.eve;
    const nowTime = getTimeStamp();
    const nowPoint = getPos(e).y;
    const moveDis = nowPoint - startPos;
    // 触摸滑动解除时间小于300ms或移动距离小于10Pixs,不做处理
    if ((nowTime - startTime) < 300 || Abs(moveDis) < 8) {
      return;
    }
    this.eve.isDraging = true;
    this.moveDistance(moveDis);
    this.eve.startPos = nowPoint;
    this.eve.startTime = nowTime;
  }
  onEndListen(e) {
    const { startPos, isDraging } = this.eve;
    const nowPoint = getPos(e).y;
    const moveDis = nowPoint - startPos;
    // 如果没有拖动，只是单纯的触摸移动，距离小于8Pixs,不做处理
    if (!isDraging && Abs(moveDis) < 8) {
      return;
    }
    this.eve.isDraging = false; // 将拖动状态重置
    this.moveDistance(moveDis);
    this.eve.status = false;
  }
  /**
   * fun: 执行移动，但是要计算上限和下限
   * @param {number} moveDis
   */
  moveDistance(moveDis) {
    const { status, level, isDraging } = this.eve;
    if (!status) {
      return;
    }
    const { data, index, marginTop } = this.props.sources[level];
    let _marginTop = marginTop + moveDis;
    let newIndex = 0;
    if (isDraging) { // 处理拖拽时的情况
      const maxMargin = (2.5 - data.length) * LineHeight; // 最大向上滑动距离，有半个行高少一点的多余量
      // _marginTop 如果滑动大于其能滑动的行程，进行处理
      _marginTop = _marginTop < maxMargin ? maxMargin : _marginTop;
      _marginTop = _marginTop > LineHeight * 2.5 ? LineHeight * 2.5 : _marginTop;
      // 新选中值的处理
      newIndex = 2 - Math.round(_marginTop / LineHeight);
      newIndex = newIndex < 0 ? 0 : newIndex;
    } else { // 处理滑动结束时的情况
      let top = 0;
      top += moveDis;
      newIndex = index - Math.round(top / LineHeight);
      if (newIndex < 0) {
        newIndex = 0;
      }
      if (newIndex > (data.length - 1)) {
        newIndex = data.length - 1;
      }
      _marginTop = (2 - newIndex) * LineHeight;
      // console.log('end last', newIndex, _marginTop);
    }

    this.props.handleChange(level, newIndex, _marginTop);
  }
  handleClick() {
    const { selectHandle, closeHandle, sources } = this.props;
    const res = sources.map(t => t.data[t.index]);
    selectHandle(res);
    closeHandle();
  }
  cancelClick() {
    this.props.closeHandle();
  }
  render() {
    const { sources, title } = this.props;
    const PickerLists = sources.map(({ data, marginTop, index }, level) => {
      const pickerProps = {
        key: level,
        data,
        marginTop,
        selectIndex: index,
        level,
        onStartListen: this.onStartListen
      };
      return (<PickerItem {...pickerProps} />);
    });
    return (
      <div
        className="picker-module js-picker-module"
        onMouseUp={e => this.onEndListen(e)}
        onTouchEnd={e => this.onEndListen(e)}
      >
        <div className="piker-shadow" />
        <div className="button-bar">
          <span className="btn-cancel" onClick={this.cancelClick}>取消</span>
          <span className="select-name">{title || '选择'}</span>
          <span className="btn-sure" onClick={this.handleClick}>确定</span>
        </div>
        <div
          className="picker-contents"
          onTouchMove={e => this.onMoveListen(e)}
        >
          { PickerLists }
        </div>
      </div>);
  }
}
/* eslint-disable react/no-multi-comp */
export default class CommonPicker extends React.Component {
  constructor(props) {
    super(props);
    let tempSource = Array.isArray(props.sources) ? props.sources.slice() : [props.sources];
    tempSource = AddMarginTop(tempSource);
    this.state = { sources: tempSource };
    this.handleChange = this.handleChange.bind(this);
    this.colseHandle = this.colseHandle.bind(this);
    this.selectHandle = this.selectHandle.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
    /* const tempSource = nextProps.sources.map((item) => {
      !('marginTop' in item) && (item.marginTop = InitMarginTop - (item.index*LineHeight));
      return item;
    }); */
      this.setState({ sources: nextProps.sources });
    }
  }
  handleChange(level, newIndex, marginTop) {
    const sources = this.state.sources.slice();
    sources[level].marginTop = marginTop;
    sources[level].index = newIndex;
    this.setState({ sources });
  }
  selectHandle() {
    /* eslint-disable no-console */
    console.log('get res', this.state);
  }
  colseHandle() {
    /* eslint-disable no-console */
    console.log('get res', this.state);
  }
  render() {
    const { handleChange, selectHandle, closeHandle, title, isShow } = this.props;
    const pikerProps = {
      title,
      sources: this.state.sources,
      handleChange: handleChange || this.handleChange,
      selectHandle: selectHandle || this.selectHandle,
      closeHandle: closeHandle || this.closeHandle
    };
    return isShow ? (<Picker {...pikerProps} />) : null;
  }
}

/* 城市选择器 */
/* eslint-disable react/no-multi-comp */
export class CityPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sources: this.getCitySource(props.initState) };
    this.handleChange = this.handleChange.bind(this);
  }
  getCitySource(params) {
    const provinceItem = { index: '', data: [] };
    const cityItem = { index: '', data: [] };
    const areaItem = { index: '', data: [] };
    // 获取所有省份
    provinceItem.data = city.map(t => t.name);
    // 索引省对应的索引
    if (params.province && params.province !== '') {
      const index = this.searchIndex('name', params.province, city);
      if (index !== '') {
        provinceItem.index = index;
      }
    }
    // 索引市对应的索引
    if (params.city && params.city !== '') {
      const queryArr = provinceItem.index === '' ? city : city[provinceItem.index].sub;
      const index = this.searchIndex('name', params.city, queryArr);
      if (index instanceof Array) {
        provinceItem.index = index[0];
        cityItem.index = index[1];
      } else if (index !== '') {
        cityItem.index = index;
      }
    }
    // 索引区对应的索引
    if (params.area && params.area !== '') {
      const queryArr = cityItem.index === '' ? city : city[provinceItem.index].sub[cityItem.index].sub;
      const index = this.searchIndex('name', params.area, queryArr);
      if (index instanceof Array) {
        provinceItem.index = index[0];
        cityItem.index = index[1];
        areaItem.index = index[2];
      } else if (index !== '') {
        areaItem.index = index;
      } else {
        provinceItem.index = 0;
        cityItem.index = 0;
        areaItem.index = 0;
      }
    }
    if (!params.city) {
      cityItem.index = 0;
    }
    if (!params.area) {
      areaItem.index = 0;
    }
    cityItem.data = city[provinceItem.index].sub.map(t => t.name);
    areaItem.data = city[provinceItem.index].sub[cityItem.index].sub.map(t => t.name);
    return AddMarginTop([provinceItem, cityItem, areaItem]);
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
  /* eslint-disable class-methods-use-this */
  searchIndex(attr, value, arr) {
    let index = '';
    index = arr.someIndex(t => t[attr] === value);
    if (index === '') { // 市级查询
      for (let i = 0; i < arr.length; i++) {
        index = arr[i].sub ? arr[i].sub.someIndex(t => t[attr] === value) : '';
        if (index !== '') {
          index = [i, index];
          break;
        }
      }
    }
    if (index === '') { // 区级查询
      for (let i = 0, j = 0; i < arr.length; i++) {
        const temp = arr[i].sub;
        for (j = 0; j < temp.length; j++) {
          index = temp[j].sub ? temp[j].sub.someIndex(t => t[attr] === value) : '';
          if (index !== '') {
            index = [i, index];
            break;
          }
        }
        if (index !== '') {
          index = [i, j, index];
          break;
        }
      }
    }
    return index;
  }
  handleChange(level, newIndex, marginTop) {
    let sources = this.state.sources.slice();
    switch (level) {
      // 省级滑动，整个数据源就改变了
      case 0:
        sources = this.getCitySource({ province: sources[0].data[newIndex] });
        sources[0].index = newIndex;
        sources[0].marginTop = marginTop;
        break;
      // 市级滑动，区级数据源跟着改变
      case 1:
        sources[1].index = newIndex;
        sources[1].marginTop = marginTop;
        sources[2].data = city[sources[0].index].sub[sources[1].index].sub.map(t => t.name);
        sources[2].index = 0;
        sources[2].marginTop = InitMarginTop;
        break;
      // 区级滑动，不需要联动，只改变自己
      case 2:
        sources[2].index = newIndex;
        sources[2].marginTop = marginTop;
        break;
      default:
        sources[2].index = newIndex;
        sources[2].marginTop = marginTop;
        break;
    }
    this.setState({ sources });
  }
  render() {
    const { selectHandle, closeHandle, title, isShow } = this.props;
    const pikerProps = {
      title,
      isShow,
      selectHandle,
      closeHandle,
      sources: this.state.sources,
      handleChange: this.handleChange
    };
    return (<CommonPicker {...pikerProps} />);
  }
}
/* 日期选择器 */
/* eslint-disable react/no-multi-comp */
export class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sources: this.initSource(props.initState) };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(level, newIndex, marginTop) {
    let [years, months, dates] = this.state.sources;
    switch (level) {
      // 年份滑动，日数据源需要改变
      case 0:
        years = { index: newIndex, marginTop };
        dates = this.initDays(years.data[newIndex], months.data[months.index]);
        break;
      // 月份滑动，日数据源需要改变
      case 1:
        months = { index: newIndex, marginTop };
        dates = this.initDays(years.data[years.index], months.data[newIndex]);
        break;
      // 日期滑动，不需要联动，只改变自己
      case 2:
        dates = { index: newIndex, marginTop };
        break;
      default:
        dates = { index: newIndex, marginTop };
        break;
    }
    this.setState({ sources: [years, months, dates] });
  }
  initSource(params) {
    const currentDay = new Date();
    const currentYear = currentDay.getFullYear();
    const currentMonth = currentDay.getMonth();
    const currentDate = currentDay.getDate();
    const { beginYear = currentYear - 20, endYear = currentYear + 20 } = params;
    const years = { data: [], index: 0 };
    const months = { data: [], index: 0 };
    let dates = { data: [], index: 0 };
    for (let i = beginYear; i < endYear; i++) {
      years.data.push(i);
      (currentYear === i) && (years.index = i - beginYear);
    }
    for (let i = 0; i < 12; i++) {
      const str = i < 9 ? `0${i + 1}` : `${i + 1}`;
      months.data.push(str);
      (currentMonth === i) && (months.index = i);
    }
    dates = this.initDays(currentYear, currentMonth, currentDate);
    return [years, months, dates];
  }
  initDays(year, month, currentDate) {
    const dates = (this.state && this.state.sources[2]) || { data: [], index: 0 };
    const maxDate = getMaxDate(year, month);
    dates.data = [];
    let index = dates.index || 0;
    for (let i = 1; i <= maxDate; i++) {
      const str = i < 10 ? `0${i}` : `${i}`;
      dates.data.push(str);
      currentDate && (currentDate === i) && (dates.index = i - 1);
    }
    index = index > (maxDate - 1) ? (maxDate - 1) : index;
    dates.index = index;
    dates.marginTop = (2 - index) * LineHeight;
    return dates;
  }
  render() {
    const { selectHandle, closeHandle, title, isShow } = this.props;
    const pikerProps = {
      title,
      isShow,
      selectHandle,
      closeHandle,
      sources: this.state.sources,
      handleChange: this.handleChange
    };
    return (<CommonPicker {...pikerProps} />);
  }
}
/* 时间选择器 */
/* eslint-disable react/no-multi-comp */
export class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    const { is24Hour = true } = props;
    this.state = { sources: this.initSource(is24Hour) };
  }
  initSource(is24Hour) {
    const curTime = new Date();
    let hour = curTime.getHours();
    const min = curTime.getMinutes();
    if (is24Hour) {
      const hours = { index: hour, data: HourScale(true) };
      const minutes = { index: min, data: TimeScale };
      return [hours, minutes];
    }
    const isHalfDay = Math.floor(hour / 12);
    hour %= 12;
    const halfDay = { index: isHalfDay, data: ['上午', '下午'] };
    const hours = { index: hour, data: HourScale(false) };
    const minutes = { index: min, data: TimeScale };
    return [halfDay, hours, minutes];
  }
  render() {
    const { selectHandle, closeHandle, title, isShow } = this.props;
    const pickerProps = {
      title,
      isShow,
      selectHandle,
      closeHandle,
      sources: this.state.sources
    };
    return (<CommonPicker {...pickerProps} />);
  }
}
