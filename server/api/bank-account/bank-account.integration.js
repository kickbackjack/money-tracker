'use strict';

var app = require('../../../server');
import request from 'supertest';

var newBankAccount;

describe('BankAccount API:', function() {

  describe('GET /api/bank-accounts', function() {
    var bankAccounts;

    beforeEach(function(done) {
      request(app)
        .get('/api/bank-accounts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bankAccounts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bankAccounts.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/bank-accounts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bank-accounts')
        .send({
          name: 'New BankAccount',
          info: 'This is the brand new bankAccount!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBankAccount = res.body;
          done();
        });
    });

    it('should respond with the newly created bankAccount', function() {
      newBankAccount.name.should.equal('New BankAccount');
      newBankAccount.info.should.equal('This is the brand new bankAccount!!!');
    });

  });

  describe('GET /api/bank-accounts/:id', function() {
    var bankAccount;

    beforeEach(function(done) {
      request(app)
        .get('/api/bank-accounts/' + newBankAccount._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bankAccount = res.body;
          done();
        });
    });

    afterEach(function() {
      bankAccount = {};
    });

    it('should respond with the requested bankAccount', function() {
      bankAccount.name.should.equal('New BankAccount');
      bankAccount.info.should.equal('This is the brand new bankAccount!!!');
    });

  });

  describe('PUT /api/bank-accounts/:id', function() {
    var updatedBankAccount;

    beforeEach(function(done) {
      request(app)
        .put('/api/bank-accounts/' + newBankAccount._id)
        .send({
          name: 'Updated BankAccount',
          info: 'This is the updated bankAccount!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBankAccount = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBankAccount = {};
    });

    it('should respond with the updated bankAccount', function() {
      updatedBankAccount.name.should.equal('Updated BankAccount');
      updatedBankAccount.info.should.equal('This is the updated bankAccount!!!');
    });

  });

  describe('DELETE /api/bank-accounts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bank-accounts/' + newBankAccount._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bankAccount does not exist', function(done) {
      request(app)
        .delete('/api/bank-accounts/' + newBankAccount._id)
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
