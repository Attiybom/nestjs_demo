##



## 热重载
1. 安装依赖
```js
npm i --save-dev webpack-node-externals run-script-webpack-plugin webpack
```
2. 根目录下 - 创建配置文件
webpack-hmr.config.js
* 配置详见对应文件

3. main.ts 使用
* 安装依赖 - 以防ts报错
- npm i -D @types/webpack-env
```js
async function bootstrap() {
  your code...

  // 热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

```

4. package.json - 脚本代码修改
* 把原来的"start:dev" 替换成如下代码
```js
  "scripts": {
    ...,
    "start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch"
  },
```

5. 执行
