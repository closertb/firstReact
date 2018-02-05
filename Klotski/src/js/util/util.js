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
    for (var i = 0; i < length; i++) {
        arr.push(i);
    }
    for (i = 0; i < length; i++) {
        let random = Math.round(Math.random() * (length - 1));
        temp = arr[random];
        arr[random] = arr[i];
        arr[i] = temp;
    }
    return arr;
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
