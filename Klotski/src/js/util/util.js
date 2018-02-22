/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-04 09:45
 * @version 1.0
 * Description:
 */
/**
 * 作用：根据传入的阶数，生成一个0-length二次方长度的乱序数组
 * @params [Number]  矩阵阶数
 * */
export const disorganize = (level) => {
    const length = level * level;
const arr = [];
let temp;
for (var i = 1; i < length; i++) {
    arr.push(i);
}
for (i = 0; i < length; i++) {
    let random = Math.round(Math.random() * (length - 2));
    temp = arr[random];
    arr[random] = arr[i];
    arr[i] = temp;
}
return arr;
};

export const randomArr = (length) => {
    const arr = [];
    let temp;
    while(arr.length<(length-1)){
        let random = 1+Math.round(Math.random() * (length - 2));
        if(random<length && arr.indexOf(random)===-1){
            arr.push(random);
        }
    }
    return arr;
};
/**
 * 作用：根据传入的阶数，生成一个0-length二次方长度的且逆序数为偶数的乱序数组
 * @params [Number]  矩阵阶数
 * */
export const evenInverseNumber = (level) => {
    const length = level * level;
    const res = [];
    let count = 0,k;
    /**
     * 数据交换
     * */
    const swap=(arr,lastIndex,newIndex)=>{
        let temp = arr[lastIndex];
        arr[lastIndex] =arr[newIndex];
        arr[newIndex] = temp;
        count++;
    }
    /**
     * 检测逆序奇偶性
     * */
    const bubbleOrder=(arr)=>{
        let i ,j;
        for(i=0;i<arr.length;i++){
            for(j=arr.length-1;j>i;j--){
                (arr[j]<arr[j-1])&&swap(arr,j-1,j);
            }
        }
        return count;
    }
    /**
     * 检测逆序奇序列变偶虚序列
     * */
    const transToEven=(arr,index)=>{
        if(arr[index]>arr[index+1]){
            swap(arr,index,index+1);
            return ;
        }
        transToEven(arr,index+1);
    };
    for (k = 1; k < length; k++) {
        res.push(k);
    }
    for (k = 0; k < length-1; k++) {
        let random = Math.round(Math.random() * (length - 2));
        swap(res,random,k)
    }
    count = 0;
    bubbleOrder(res.slice());
    var val = count%2 + (level%2)*5 ;
    k =Math.floor(Math.random()*length)+1;
    k = (k>length-2)? (length-5) : k ;
    let row = Math.floor(k/level);
    switch(val){
        case 0:   //偶序列，偶数行,生成一个偶数行的空值位置
            if(row%2===0){  //奇数行
                k =k+level;
            }
            break;
        case 1:   //奇序列，偶数行，生成一个奇数行的空值位置
            if(row%2){  //偶数行
                k =k-level;
            }
            break;
        case 5:  //偶序列，奇数行
            break;
        case 6:  //奇序列，奇数行
            transToEven(res,0);
            break;
    }

    res.splice(k,0,0);
    return res;
};
/**
 * 作用：根据传入的阶数，现索引位置，方向，返回沿传入方向移动一个单位后的位置；
 * @params：level [Number]  矩阵阶数
 * @params：index [Number]  现索引位置
 * @params：dir   [String]  滑动方向
 * */
export const getTargetState = (level, index, dir) => {
    const direction = {
        'left': {
            x: -1,
            y: 0
        },
        'right': {
            x: 1,
            y: 0
        },
        'up': {
            x: 0,
            y: -1
        },
        'down': {
            x: 0,
            y: 1
        }
    };
    const offsetVal = direction[dir];
    const targetPos = {
        x: index % level + offsetVal.x,
        y: Math.floor(index / level) + offsetVal.y
    };
    if (offsetVal.x && (targetPos.x === level || targetPos.x < 0)) {
        return index;
    }
    if (offsetVal.y && (targetPos.y === level || targetPos.y < 0)) {
        return index;
    }
    return targetPos.x + targetPos.y * level;
}
export const pointer = {
    status: false,
    index:0,
    position: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
    },
    getPos: function (e) {
        return {
            x: e.screenX || e.changedTouches[0].pageX,
            y: e.screenY || e.changedTouches[0].pageY,
        }
    },
    listen: function (e,callback,index) {
        var type = e.type;
        if (type === 'mousedown' || type === 'touchstart') {
            var pos = this.getPos(e);
            this.index = index;
            this.status = true;
            this.position.startX = this.position.endX = pos.x;
            this.position.startY = this.position.endY = pos.y;
        }
        if (type === 'mouseup' || type === 'touchend') {
            const pos =  this.getPos(e);
            this.position.endX = pos.x;
            this.position.endY = pos.y;
            callback(this.getDirection(),this.index);
            this.status = false;
        }
    },
    getAngle:function(angx, angy){
        return Math.atan2(angy, angx) * 180 / Math.PI;
    },
    getDirection:function() {
        const angx = this.position.endX - this.position.startX;
        const angy = this.position.endY - this.position.startY;
        let dir='none';

        //滑动距离判断，防抖
        if (Math.abs(angx) < 4 && Math.abs(angy) < 4) {
            return dir;
        }
        var angle = this.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            dir ='up';
        } else if (angle > 45 && angle < 135) {
            dir ='down';
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            dir ='left';
        } else if (angle >= -45 && angle <= 45) {
            dir ='right';
        }
        return dir;
    }
}
export const timer ={

    interId:0,
    start:function (callback) {
        const _this = this;
        let startTime = new Date().getTime(),tPass=0;
        const formatter=(t)=>{
            const res =t>9 ? t : '0'+t
            return res;
        }
        this.interId = setInterval(function () {
            let tNew = new Date().getTime(),ms,sec,min,timeStr;
            tPass = tNew - startTime;
            ms = Math.floor(tPass % 1000%10);
            sec = Math.floor((tPass / 1000) % 60);
            min = Math.floor((tPass / 1000 / 60) % 60);
            timeStr = formatter(min)+':'+formatter(sec)+':'+formatter(ms);
            callback(timeStr);
        },100)
    },
    stop:function () {
        clearInterval(this.interId);
    }
}
export const arrayGenerate =(length)=>{
    const items =[];
    for(let i=1;i<length;i++){
        items.push(i);
    }
    items.push(0);
    return items ;
}
