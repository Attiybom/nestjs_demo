## ORM
### 概念与作用
* ORM(Object Relational Mapping)对象关系映射，其主要作用是在编程中，把面向对象的概念跟数据库中的概念对应起来
* 举例子：
定义一个对象，那就对应着一张表，这个对象的实例，就对应着表中的一条记录
当创建好一个对象，ORM会自动将该对象转换为对应的数据库，而该对象又称作实体类
* Object <=> Mapping <=> DB
![Alt text](image-1.png)

### 特点
* 方便维护：数据模型定义在同一个地方，利于重构
* 代码量少、对接多种库：代码逻辑更易懂
* 工具多、自动化能力强：数据库删除关联数据、事务操作（回滚）等

### 常用ORM
* prisma
* sequelize
* typeORM


### typeORM
* 安装typeORM mysql2
```
pnpm i --save @nestjs/typeorm typeorm mysql2
```
#### app.module.ts中配置
```ts
// 写法一：比较固定，无法读取env文件的相关配置
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'example',
      database: 'testDB',
      entities: [],
      // 同步本地的schema与数据库 => 初始化的时候使用
      synchronize: true,
      logging: ['error'],
    }),


// 写法二：通过config读取根目录下的env文件，进行实现相关配置
// 另外该配置，还需要对参数进行验证

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: joi.object({
        NODE_ENV: joi
          .string()
          .valid('development', 'production')
          .default('development'),
        DB_PORT: joi.number().default(3306),
        DB_URL: joi.string().domain(),
        DB_HOST: joi.string().ip(),
        DB_TYPE: joi.string().valid('mysql', 'oracle', 'redis'), // 验证数据库类型，且限定mysql、oracle、redis
        DB_DATABASE: joi.string().required(), // 验证数据库，且必填
        DB_USERNAME: joi.string().required(),// 用户名，且必填
        DB_PASSWORD: joi.string().required(),// 密码，且必填
        DB_SYNC: joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get(ConfigEnum.DB_TYPE),
          // type: 'mysql',//也可以直接指定mysql，这样就不用类型断言了
          host: configService.get(ConfigEnum.DB_HOST),
          port: configService.get(ConfigEnum.DB_POST),
          username: configService.get(ConfigEnum.DB_USERNAME),
          password: configService.get(ConfigEnum.DB_PASSWORD),
          database: configService.get(ConfigEnum.DB_DATABASE),
          entities: [],
          // 同步本地的schema与数据库 => 初始化的时候使用
          synchronize: true,
          logging: ['error'],
        }) as TypeOrmModuleOptions, // 类型断言
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3307,
    //   username: 'root',
    //   password: 'example',
    //   database: 'testDB',
    //   entities: [],
    //   // 同步本地的schema与数据库 => 初始化的时候使用
    //   synchronize: true,
    //   logging: ['error'],
    // }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
```
