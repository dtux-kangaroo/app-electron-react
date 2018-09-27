


## 项目说明
#### 使用技术
```text
 热更新、ES6/7、scss、bable7,Router4、react16、redux、webpack4、async／await、前端node服务器，按需加载...
```
#### 客户端渲染
```
本项目是客户端渲染版本
对于 HTTP/1.1 客户端，由 webpack 打包你的应用程序会尤其强大，因为在浏览器发起一个新请求时，
它能够减少应用程序必须等待的时间。对于 HTTP/2，你还可以使用代码拆分(Code Splitting)以及通过 
webpack 打包来实现最佳优化。
```

==========================

#### 安装教程

1、 安装依赖包。
```
npm install 或者cnpm install 或者yarn(推荐)

```

2、运行脚手架。
 ```
 npm start

 ```

3、将会开启8080端口.
```
http://127.0.0.1:8080

```

4、打包发布: 默认打包后的文件统一放到dist文件夹下  

```
npm run build

```
5、code编写规则及行为规范请参考

```
https://github.com/cindyrise/doc.git

```
===========================================


#### 项目结构

```text
├── build //webpack各种环境打包配置
├── dist //打包后文件存放文件夹
├── src //项目的主要目录
│     │     │     ├── assets //此应用对应的静态资源
│     │     │     │     ├── img //全局静态图片目录
│     │     │     │     ├── style //全局样式地址
│     │     │     │     ├── font //全局字体目录
│     │     │     │     ├── lib //全局js类库地址
│     │     │     ├── pages //页面
│     │     │     ├── tpls //模板页面
│     │     │     ├── components //全局公用组件
│     │     │     ├── utils //提供一些小工具
│     │     │     ├── index.js //应用的入口
│     │     │     └── router //路由
│     │     ├── index.html //wepack打包模板文件
├── .babelrc //babel相关配置
└── package.json //node相关环境的配置文件

```
