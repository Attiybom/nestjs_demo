## 多环境配置
* 安装依赖
```js
pnpm i --save @nestjs/config@2.2.0
```
### 创建环境文件
1. 根目录下创建.env文件


### 使用配置
1. app.module.ts文件引入
```js
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})

```
ConfigModule.forRoot({ isGlobal: true }) : 读取根目录下的env文件, 且设为全局
采取枚举的方式引入环境变量
```ts
export enum ConfigEnum {
  DB = 'DB',
  DB_HOST = 'DB_HOST',
}

```




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
