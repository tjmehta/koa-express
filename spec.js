'use strict';
const koa = require('koa'),
  supertest = require('supertest'),
  express = require('./');

describe('koa-connect', function() {
  let app;

  beforeEach(function() {
    app = koa();
    app.use(function* (next) {
      yield* next;
      this.status = 204;
    })
  });

  it('works with happy middleware', function(done) {
    app.use(express(function(req, res, next) {
      next();
    }));
    supertest(app.callback())
      .get('/')
      .expect(204)
      .end(done);
  });

  it('works with angry middleware', function(done) {
    app.use(express(function(req, res, next) {
      next(new Error());
    }, function(req, res, next) {
      throw new Error('Should not be called');
    }));
    supertest(app.callback())
      .get('/')
      .expect(500)
      .end(done);
  });

  it('works with middleware that terminates', function(done) {
    app.use(express(function(req, res, next) {
      res.statusCode = 200;
      res.end();
    }, function(req, res, next) {
      throw new Error('Should not be called');
    }));
    supertest(app.callback())
      .get('/')
      .expect(200)
      .end(done);
  });
})
