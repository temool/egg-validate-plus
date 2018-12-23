'use strict';
/**
 * 框架会把 app/extend/context.js 中定义的对象与 KOA Context 的prototype对象合并， 在处理请求时会基于扩展后的prototype生成ctx对象
 */

const AsyncValidator = require('async-validator');

module.exports = {
  /**
   * 用法 this.ctx.validate(rule, query)
   * @param {string，object} rule rules 目录下的校验文件(不需要带上 rules 目录)，或者直接传校验规则
   * @param {object} query 需要校验的数据
   */
  async validate(rule, query) {
    let descriptor = this.app.rules
    if (typeof rule === 'string') {
      const paths = rule.split('.')

      paths.forEach(path => {
        descriptor = descriptor[path]
      });
    } else if (typeof rule === 'object') {
      descriptor = rule
    }

    const validator = new AsyncValidator(descriptor)
    await validator.validate(query, { firstFields: true }, errors => {
      if (this.app.config.validatePlus
        && this.app.config.validatePlus.resolveError
        && typeof this.app.config.validatePlus.resolveError === 'function') {
        this.app.config.validatePlus.resolveError(this, errors)
        throw Error(errors)
      } else {
        ctx.type = 'json';
        ctx.status = 400;
        this.body = {
          code: 400,
          message: '参数错误',
          error: errors
        }
        throw Error(errors)
      }
    })
  }
};
