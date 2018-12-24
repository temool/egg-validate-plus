# egg-validate-plus

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-validate-plus.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-validate-plus
[travis-image]: https://img.shields.io/travis/eggjs/egg-validate-plus.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-validate-plus
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-validate-plus.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-validate-plus?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-validate-plus.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-validate-plus
[snyk-image]: https://snyk.io/test/npm/egg-validate-plus/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-validate-plus
[download-image]: https://img.shields.io/npm/dm/egg-validate-plus.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-validate-plus

<!--
Description here.
-->
## 用法

### 开启插件

```js
// config/plugin.{env}.js
exports.validatePlus = {
  enable: true,
  package: 'egg-validate-plus',
};
```

### 配置插件

```js
// config/config.{env}.js
config.validatePlus = {
  resolveError(ctx, errors) {
    if (errors.length) {
      ctx.type = 'json';
      ctx.status = 400;
      ctx.body = {
        code: 400,
        error: errors,
        message: '参数错误',
      };
    }
  }
};

```
### 使用插件
#### 目录结构
```bash
|- MY-PROJECT
    |- app
        |- controller
            |- user.js
            |- post.js
        |- rules
            |- user
                |- login.js [用户登录参数校验规则]
            |- post
                |- add.js [创建 post 参数校验规则]
    |- config
        |- config.default.js
        |- plugin.js
    |- package.json
    |- README.md
```
#### 规则的传入方式
##### 1.传入字符串
```js
// app/controller/xx.js
const { query } = this.ctx.request;

// 拿到验证结果
const validateResult = await this.ctx.validate('user.login', query)
// 验证不通过时，阻止后面的代码执行
if (!validateResult) return
```
注意：不要带上 rules
##### 2.直接传入验证规则对象
```js
// app/controller/xx.js
// 直接引入 rules 文件下的验证规则，也可以是自己写的验证规则对象
const rule = this.app.rules.user.login
// 数据格式
// const rule = {
//   id: [
//     { required: true },
//     { type: 'number', message: 'id 必须为数字 }
//   ],
//   password: [
//     { required: true },
//     { type: 'string', message: 'password 必须为字符串 }
//   ]
// }

// 从客户端传入的参数 
const { query } = this.ctx.request;
// 数据格式： 
// query = {
//   username: 123456,
//   password: 'abcdefg'
// }

// 拿到验证结果
const validateResult = await this.ctx.validate(rule, query)
// 验证不通过时，阻止后面的代码执行
if (!validateResult) return
```

## 使用场景

- 为什么要自己造轮子？
  其实 egg 官方有一个 [egg-validate](https://github.com/eggjs/egg-validate#readme) 插件，非常的优秀。但是我觉得有几个不满意的地方：
  - 不能使用自定义错误提示
  - 类型校验兼容性差
  - 非必填校验兼容性差
- 提供哪些更好的体验？
  - 使用自定义错误提示
  - 提供更多的类型校验
  - 兼容更多非必填校验场景

## 依赖说明

### 依赖的 egg 版本

egg-validate-plus 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

### 依赖的插件
- async-validator
目前大部分的校验规则插件都使用了 [async-validator](https://github.com/yiminghe/async-validator)，包括前端的表单验证，egg-validate-plus 也不例外，感谢作者 [yiminghe](https://github.com/yiminghe)


## 默认配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 提问交流
欢迎提 [PR](https://github.com/temool/egg-validate-plus/pulls) 和 [issues](https://github.com/temool/egg-validate-plus/issues) 。

## License

[MIT](LICENSE)
