'use strict';

var app = require('../..');
import request from 'supertest';

var newSubCategory;

describe('SubCategory API:', function() {

  describe('GET /api/sub-categories', function() {
    var subCategorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/sub-categories')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          subCategorys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      subCategorys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/sub-categories', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sub-categories')
        .send({
          name: 'New SubCategory',
          info: 'This is the brand new subCategory!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSubCategory = res.body;
          done();
        });
    });

    it('should respond with the newly created subCategory', function() {
      newSubCategory.name.should.equal('New SubCategory');
      newSubCategory.info.should.equal('This is the brand new subCategory!!!');
    });

  });

  describe('GET /api/sub-categories/:id', function() {
    var subCategory;

    beforeEach(function(done) {
      request(app)
        .get('/api/sub-categories/' + newSubCategory._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          subCategory = res.body;
          done();
        });
    });

    afterEach(function() {
      subCategory = {};
    });

    it('should respond with the requested subCategory', function() {
      subCategory.name.should.equal('New SubCategory');
      subCategory.info.should.equal('This is the brand new subCategory!!!');
    });

  });

  describe('PUT /api/sub-categories/:id', function() {
    var updatedSubCategory;

    beforeEach(function(done) {
      request(app)
        .put('/api/sub-categories/' + newSubCategory._id)
        .send({
          name: 'Updated SubCategory',
          info: 'This is the updated subCategory!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSubCategory = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSubCategory = {};
    });

    it('should respond with the updated subCategory', function() {
      updatedSubCategory.name.should.equal('Updated SubCategory');
      updatedSubCategory.info.should.equal('This is the updated subCategory!!!');
    });

  });

  describe('DELETE /api/sub-categories/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sub-categories/' + newSubCategory._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when subCategory does not exist', function(done) {
      request(app)
        .delete('/api/sub-categories/' + newSubCategory._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
