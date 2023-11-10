## dockerhub中找到mysql
* 找到mysql 对应跑到yml代码并复制


## 根目录下创建docker-compose.yml 文件
### 将dockerhub复制的代码添加进去
```yml
# Use root/example as user/password credentials
version: '3.1'

services:
  # 开启了两个服务 1. mysql 2.adminer
  db:
    image: mysql
    # NOTE: use of "mysql_native_password" is not recommended: https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password
    # (this is just an example, not intended to be a production configuration)
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
  # 简易的管理面板
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

## 运行起来
```
docker-compose up -d
```
