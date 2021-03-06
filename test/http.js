process.env.NODE_ENV = 'production';

var request = require('supertest');
var expect = require('chai').expect;
var app = require('../app');

describe('Test fonts files', function () {
    it('responds to /fonts/fontawesome-webfont.svg', function (done) {
      request(app)
        .get('/fonts/fontawesome-webfont.svg')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('responds to /fonts/fontawesome-webfont.eot', function (done) {
      request(app)
        .get('/fonts/fontawesome-webfont.eot')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('responds to /fonts/fontawesome-webfont.ttf', function (done) {
      request(app)
        .get('/fonts/fontawesome-webfont.ttf')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('responds to /fonts/fontawesome-webfont.woff', function (done) {
      request(app)
        .get('/fonts/fontawesome-webfont.woff')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('responds to /fonts/fontawesome-webfont.woff2', function (done) {
      request(app)
        .get('/fonts/fontawesome-webfont.woff2')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
});

describe('Test views files', function () {
    it('responds to /views/login.html', function (done) {
      request(app)
        .get('/views/login.html')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('responds to /views/signup.html', function (done) {
      request(app)
        .get('/views/signup.html')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('responds to /views/users-id.html', function (done) {
      request(app)
        .get('/views/users-id.html')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('responds to /views/management.html', function (done) {
      request(app)
        .get('/views/management.html')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('responds to /views/users-new.html', function (done) {
      request(app)
        .get('/views/users-new.html')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
    it('responds to /views/bugs-list.html', function (done) {
      request(app)
        .get('/views/bugs-list.html')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
});

describe('Test errors', function () {
    it('404 everything else', function (done) {
        request(app)
          .get('/foo/bar')
          .expect(404, done);
    });
});

describe('Test favicon.ico', function () {
    it('responds to /favicon.ico', function (done) {
      request(app)
        .get('/favicon.ico')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
});
