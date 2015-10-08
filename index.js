'use strict';
const flatten = require('array-flatten'),
  compose = require('koa-compose');

function c2k (mw) {
  const middleware = flatten(arguments).map(middleware => {
    return function* (next) {
      const req = this.req;
      const res = this.res;

      yield new Promise(function(resolve, reject) {
        middleware(req, res, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      yield* next;
    }
  });

  return function * () {
    yield compose(middleware);
  }

}

module.exports = c2k;
