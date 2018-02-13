````
##
开发一个 数字华容道游戏
##
git clone 过后首先执行 
npm install 下载所需要的依赖
##
打包命令 ：npm run build
##
启动服务+打包 ：npm run dev （包含热加载功能）

## 一些说明 ##
|--index.html  模板文件
|--src         源码目录
   |--css      样式文件
      |--theme.scss      页面颜色整体定义
      |--index.scss      页面样式文件
   |--js       js文件
      |--page            页面组件
          |--home.js     主页
          |--simple.js   引导页
          |--game.js     游戏页面
      |--component       功能组件
          |--game.js     svg图标组件
          |--block.js    通用方法定义
          |--shadow.js   弹出层组件
          |--picker.js   阶数选择组件
          |--icon.js     svg图标组件
          |--square.js   滑动块组件(最小的组件块)
      |--util            通用js方法定义
   |--images   svg文件

## 这个叫前言 ##
年末了。哦，不，要过年了。以前只能一路站到公司的我，今早居然是坐着过来的。新的一年，总要学一个新东西来迎接新的未来吧，所以选择了一直未碰的那个据说是全宇宙最牛逼的前端框架-React，在上下班的地铁上看了两天官方教程，so what。光看不练假把式，于是就想着做个什么，偶然看到一个妹妹发了一条关于玩数字华容道，根本停不下来的朋友圈，这游戏我在今年的最强大脑看过，但是就看两小天才在滑呀滑呀滑，感觉还不错，程序猿就该多玩益智类，少玩什么跳一跳。于是去商店下了个，玩着还行，就是广告太多，而且只能玩五阶以下的，看起不难，一个想法涌于脑上，何不拿这练练手做个Demo，毕竟我们属于智慧家族的。闲话扯完，进入正题。本文包含但不仅包括以下内容:

 - Demo 开发环境
 - 数字华容道里的秘密
 - 讲一讲里面算法的实现
 - React的使用感受及易错点

## Demo 开发环境 ##
React：16.2.0
react-router-dom：4.2.2
webpack：3.8.1
JS：ES6
CSS：Scss
[React教程][3]

项目目录结构：如下图所示
![项目目录结构][18]

## 数字华容道里的秘密 ##
### 玩法说明 ###
 数字华容道里在外国被称为puzzle,译为数字推盘，最经典的就是puzzle15的高价悬赏13 15 14局面的解。怎么玩，一图胜千言，简单来说就是讲左图的乱选状态，滑成右图所示的顺序状态。个人感觉和小时候玩的推箱子有点类似。

![clipboard.png][5]

### 你不知道的秘密 ###
其实写完Demo的随机序列页面生成和操作交互就用了一个周天和一个周一晚上，但到现在线上这个样子，又多用了三四个晚上(白天上班，晚上学习，这就是前端的日常)，为什么？因为当时基础版部署到线上，让女朋友试一把，结果玩个三阶的，都两分钟了还在折腾(我最快是18秒还原)，怎么这么笨，于是抢过来，捣腾，再捣腾，怎么回事，感觉无解啊，于是去百度了一下，在知乎里看到了这个问题，还真的有无解的情况，[问题地址][4]。看图，后面还要讲(敲黑板)

![clipboard.png][6]

噢，原来是酱紫。光随机生成一个乱序数列是不够的，还得保证这个数列的逆序数为偶数，嗦嘎。于是在随机序列的生成中又多加一个过程，判断序列逆序数奇偶性，并调整。早上地铁上自己又不断玩玩测试，三阶ok，四阶ok，五阶ok，然后又一遍，一遍。原以为这样就大功告成了，但是出现了这样的画面。有图。谁刚说的四阶ok。。。。于是又测试了多次，发现三阶，五阶确实ok，但四阶确实有Bug。Why，后面自己每开一局，截一张图，无解的，标记下来，下面就是几张立功的图片。
![立了大功的几张图][7]
下午年会，领导上面讲，自己下面睡。睡得天昏地暗，时过境迁，居然还在叨叨叨，自己就拿起酒店提供的纸和笔找这些数字间的秘密。首先，这几组数字都是偶逆序列，前一晚写的调整奇逆序列为偶逆序列的代码是没有问题的，那问题出在哪了。抓脑抠鼻，抖脚摇头，那一组图片来回翻阅，灵光一闪，水哥附身，原来是这样:空格项都出现在第三行，哦，不，应该是奇数行。为什么呢？又去百度，又看到了上面知乎和豆瓣的正经说瞎话的大神（此生最讨此类人，害死个仙人），看到这，我开始怀疑，这句话的正确性。奇数阶，格子上下左右移动确实不会改变数列的逆序奇偶性。但偶数阶，格子的上下移动是会改变序列的奇偶性的，简单总结一下：

奇数阶(3x3,5x5)：上移或下移一个数字，其调换的位置是偶数，所以不改变数列逆序数的奇偶性，所以奇数阶，生成的初始随机数列的逆序数必须为偶数；

偶数阶(4x4,6x6)：上移或下移一个数字，其调换的位置是奇数，所以会改变数列逆序数的奇偶性，上下交换一次改变一次奇偶性，交换两次就回到初始状态。所以可以大致这样理解，偶数的平方仍然为偶数，其有数字的滑块个数为奇数个，所以有一个数字必然会和空滑块产生位置交换，如果空滑块位于奇数行（空滑块是不参于数字序列的逆序数计算的），就会产生2n-1次交换，其会改变数列逆序数的奇偶性；而位于偶数行，就会产生2n次交换，不会改变数列逆序数的奇偶性，所以用一个公式总结就是：（数列初始状态是否为偶数） === （空行是否为偶数），简单来讲就是求这两个数的异或。最后的代码流程的实现
![clipboard.png][8]




## 讲一讲里面算法的实现 ##
### 生成一个乱序不重复的1~n数组数列 ###
方法有很多，但我知道的两种，这里分享一下，有知道其他的，请留言做个评论，让大家一起进步。
顺序数组随机性调换
思路基本就是，先生成一个顺序的1~n的顺序数组，然后再通过一个1~n的循环来打乱这个数组，其时间复杂度是O(n)。代码如下。

        export const disorganize = (length) => {
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
随机数生成乱序数组
生成一个随机数，并判断其是否在目标数组中已存在，当数组个数为n时，目的达到。其时间复杂度我不知，代码如下：

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
虽然代码看起比上面的简单，但其时间复杂度最由是O(f(n)，最差情况未知，所以，方法一更推荐，如果说的有什么毛病，还请及时指出。
### 数列逆序性的奇偶性判断 ###
最先想到的就是冒泡排序，因为冒泡排序过程就是判断两个数是否逆序，是，就交换，不是，继续下一组判断。所以，我们直接将交换的次数，记为数列逆序数个数，就达到了想要的效果。当然这个题用其他排序方法也能达到目的，理解了其排序的原理，就很容易计算数列的逆序性，我这里是直接用的以前冒泡排序的算法。

    const bubbleOrder=(arr)=>{
        let i ,j ,count=0;
        const swap=(tar,lastIndex,newIndex)=>{
            let temp = tar[lastIndex];
            tar[lastIndex] =tar[newIndex];
            tar[newIndex] = temp;
            count++;
        }
        for(i=0;i<arr.length;i++){
            for(j=arr.length-1;j>i;j--){
                (arr[j]<arr[j-1])&&swap(arr,j-1,j);
            }
        }
        return count;
    }
### JS写一个秒表 ###
秒表是啥，start-pause-stop-reset，中间的步骤不是必须的，但前后两步必须。当然方法有很多，但都离不开setTimeout或则setInterval两个方法，requestAnimation应该也可以。这里提供一个自己写的，当然思路来源于网上，只是用自己的思路表达出来。基于setInterval和Date对象。源码如下:

    const timer=(offsetTime)=>{  //offsetTime为0时，表示从0开始计,不为0，表示是暂停后继续计时
        const formatter=(t)=>{
            const res =t>9 ? t : '0'+t
            return res;
        }
        let startTime = new Date().getTime(),tPass=0,tOffset=offsetTime||0;
        this.interId = setInterval(()=> {   //this.interId 是组件下面建的一个保持定时器值的,用于暂停和停止
            let tNew = new Date().getTime(),ms,sec,min,timeStr;
            tPass = tOffset +tNew - startTime;
            ms = Math.floor(tPass/10 % 100);
            sec = Math.floor((tPass / 1000) % 60);
            min = Math.floor((tPass / 1000 / 60) % 60);
            timeStr = formatter(min)+':'+formatter(sec)+':'+formatter(ms);
            this.tick(timeStr,tPass);
        },100)
    }

    tick(timeStr,tPass){  //这是游戏页面一个react组件中的一个用于更新显示dom的触发器
        this.setState({
            timePass:tPass,
            time:timeStr
        })
    }
## React的使用感受及易错点(大神留步) ##
用Vue与用React的区别，抱头痛哭，Vue半年没上项目了，忘得差不多了，个人观点（非喜勿喷）。
 - 直接感受就是，Vue确实比React容易上手,其模板，js，css的组件式的开发方式，更接近我们以前工作中常用的template ＋ requireJs的开发模式。
 - React更强调js的编程和项目的整体架构，state放在哪一级，哪一级通过props来控制,当然route 4.0的组件化设计更强调这一点；
 - React在国内还是不像Vue那么大众，比方说，出了问题，很多只有在stackOverflow有相关答案；
 - 不过，不论是Vue还是React，熟悉ES6和面向对象的编程，两者上手都是很快的(装个逼,别打我)。


在整个学习过程中，将很多教程中敲黑板指出来的坑，又结结实实踩了一遍，现在可以说影响深刻。自己整理了一下，做个小分享，愿和我一样刚入门的，遇见下面的错误，不会那么迷茫
不要在
### Cannot read property 'setState' of undefined' ###
解释：这个问题，主要是组件对象的构造constructor中，未传入props对象，导致整个组件对象无props属性;其实除了理解继承，理解React组件的
![clipboard.png][11]

### Cannot read property 'size' of undefined' ###
解释：这个问题，主要是组件对象的构造constructor中，未传入props对象，导致整个组件对象无props属性;其实除了理解继承，理解React组件的[生命周期][19]也很重要。

![clipboard.png][12]


### you are adding a new property in the Synthetic event Object ###
解释：可以简单理解为[SyntheticEvent][20]是react为浏览器兼容写的一个dom事件代理，除了她原有的那些属性，你不能私自为其添加属性。
![clipboard.png][9]
![clipboard.png][10]

### 其他，后面持续补充 ###
## 一个疑问 ##
一开始我的游戏盒子是用的flex布局，但一考虑，盒子里面的方块要滑动效果，我要做滑动的缓动效果，于是又改用了绝对定位布局，每个
方块计算其定位点。但事实证明，我当时确实太菜，我用了state来管理每个方块在盒子的位置，但我调整state时，React的virtualDom
会自动计算，并更新dom节点，那我保持整个项目，怎么才能自己做出缓动效果呢？纯CSS不行，请各位大神给点建议。

## 结束语 ##
在放假的前几个小时，把拖了几天的文章写完，有点赶，有不足的地方还请及时指出。关于这个项目，后期自己想继续优化，做一些功能拓展，比如接入数据记录,NxM阶这样的玩法，有思路的，还请能分享给我，邮箱：closertb@163.com。在最后，送给2017未曾放弃努力的自己一些鼓励，愿2018年能用更好的发展。也祝各位战友2018新年快乐，年后再见！！！！！

  [1]: http://closertb.site/Klotski/#/
  [2]: https://github.com/closertb/firstRect
  [3]: https://doc.react-china.org/docs/hello-world.html
  [4]: https://www.zhihu.com/question/266065256/
  [5]: https://user-gold-cdn.xitu.io/2018/2/13/1618cb629aace0d9?w=796&h=360&f=png&s=53732
  [6]: https://user-gold-cdn.xitu.io/2018/2/13/1618cb629ab569ec?w=711&h=628&f=png&s=71949
  [7]: https://user-gold-cdn.xitu.io/2018/2/13/1618cb62a7e093f4?w=800&h=286&f=png&s=75406
  [8]: https://user-gold-cdn.xitu.io/2018/2/13/1618cb629ac112bc?w=737&h=274&f=png&s=16593
  [9]: https://user-gold-cdn.xitu.io/2018/2/13/1618d487f446f29f?w=792&h=64&f=png&s=34023
  [10]: https://user-gold-cdn.xitu.io/2018/2/13/1618cb629d17bc25?w=800&h=166&f=png&s=71885
  [11]: https://user-gold-cdn.xitu.io/2018/2/13/1618d487f004387d?w=800&h=234&f=png&s=114244
  [12]: https://user-gold-cdn.xitu.io/2018/2/13/1618deda973d9c73?w=800&h=121&f=png&s=85783
  [17]: https://m.douban.com/mip/group/topic/21451258/?qq-pf-to=pcqq.c2c
  [18]: https://sfault-image.b0.upaiyun.com/118/985/118985779-5a82558e80a36_articlex
  [19]: https://juejin.im/entry/587de1b32f301e0057a28897
  [20]: https://doc.react-china.org/docs/events.html


