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



