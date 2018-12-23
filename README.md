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

## 使用场景

- 为什么要自己造轮子？
  其实 egg 官方有一个 [egg-validate](https://github.com/eggjs/egg-validate#readme) 插件，非常的优秀。但是我觉得有几个不满意的地方：
  - 不能使用自定义错误提示
  - 类型校验兼容性差
  - 非必填校验兼容性差


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
欢迎提 PR 和 issues;
请到 [egg-validate-plus issues](https://github.com/temool/egg-validate-plus/issues) 异步交流。

## License

[MIT](LICENSE)
