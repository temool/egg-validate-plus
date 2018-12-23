'use strict';

/**
 * egg-validate-plus default config
 * @member Config#validatePlus
 * @property {String} SOME_KEY - some description
 */
exports.validatePlus = {
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
  },
};
