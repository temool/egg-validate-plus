'use strict';

const mock = require('egg-mock');

describe('test/validate-plus.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/validate-plus-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, validatePlus')
      .expect(200);
  });
});
