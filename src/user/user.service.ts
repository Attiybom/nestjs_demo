import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers() {
    return {
      code: 0,
      msg: '请求成功',
      data: [],
    };
  }

  addUser() {
    return {
      code: 0,
      msg: '添加用户成功',
      data: {},
    };
  }
}
