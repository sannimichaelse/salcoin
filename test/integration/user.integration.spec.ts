import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { expect } from 'chai';

chai.use(chaiHttp);
const server = 'http://localhost:9002';

describe('Integration Tests', () => {

  let token: any;
  let token_two: any;
  let user_one_address: any;
  let user_two_address: any;
  describe('User Endpoints', () => {
    const testData = {
      'name': 'Tolustar',
      'email': 'tomiwatech@gmail.com',
      'password': '123456',
      'description': 'dkdkdkkdd'
    };

    const testData2 = {
      'name': 'Tomiwa',
      'email': 'tolustar@gmail.com',
      'password': '123456',
      'description': 'dkdkdkkdd'
    };

    it('Should not signup user if request body is incomplete /api/auth/signup', function (done) {
      chai.request(server)
        .post('/api/auth/signup')
        .send({
          'name': 'Tolustar',
          'email': 'tomiwatech@gmail.com',
        })
        .end(function(err, res) {
        if (err) throw err;
          expect(res.body.status).to.equal('error');
          expect(res.body.code).to.equal(400);
          done();
        });
    });

    it('Should signup user1 /api/auth/signup', function (done) {
      chai.request(server)
        .post('/api/auth/signup')
        .send(testData)
        .end(function(err, res) {
        if (err) throw err;
          expect(res.body.status).to.equal('success');
          expect(res.body.code).to.equal(201);
          done();
        });
    });

     it('Should signup user2 /api/auth/signup', function (done) {
      chai.request(server)
        .post('/api/auth/signup')
        .send(testData2)
        .end(function(err, res) {
        if (err) throw err;
          expect(res.body.status).to.equal('success');
          expect(res.body.code).to.equal(201);
          done();
        });
    });

    it('Should login user1 /api/auth/login', function (done) {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          'password': '123456',
          'email': 'tomiwatech@gmail.com',
        })
        .end(function(err, res) {
        if (err) throw err;
          token = res.body.token;
          expect(res.body.status).to.equal('success');
          expect(res.body.code).to.equal(200);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

     it('Should login user2 /api/auth/login', function (done) {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          'password': '123456',
          'email': 'tolustar@gmail.com',
        })
        .end(function(err, res) {
        if (err) throw err;
          token_two = res.body.token;
          expect(res.body.status).to.equal('success');
          expect(res.body.code).to.equal(200);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
  });

  describe('Wallet Endpoints', () => {
    it('create an ethereum wallet for user1 /api/wallet', function (done) {
      chai.request(server)
        .post('/api/wallet')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({
            'amount': 5000,
            'currency': 'ethereum'
        })
        .end(function(err, res) {
        if (err) throw err;
          user_one_address = res.body.data.address;
          expect(res.body.status).to.equal('success');
          expect(res.body.code).to.equal(200);
          done();
        });
    });

    it('create an ethereum wallet for user2 /api/wallet', function (done) {
      chai.request(server)
        .post('/api/wallet')
        .set('Content-Type', 'application/json')
        .set('authorization', token_two)
        .send({
            'amount': 5000,
            'currency': 'ethereum'
        })
        .end(function(err, res) {
        if (err) throw err;
          user_two_address = res.body.data.address;
          expect(res.body.status).to.equal('success');
          expect(res.body.code).to.equal(200);
          done();
        });
    });

    it('create a bitcoin wallet /api/wallet', function (done) {
      chai.request(server)
        .post('/api/wallet')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({
            'amount': 1000,
            'currency': 'bitcoin'
        })
        .end(function(err, res) {
        if (err) throw err;
          expect(res.body.status).to.equal('success');
          expect(res.body.code).to.equal(200);
          done();
        });
    });

    it('get user wallet /api/wallet', function (done) {
      chai.request(server)
        .get('/api/wallet')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .end(function(err, res) {
        if (err) throw err;
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Wallet fetched successfully');
          expect(res.body.data).to.be.an('array');
          expect(res.body.code).to.equal(200);
          done();
        });
    });

    it('get user2 wallet /api/wallet', function (done) {
      chai.request(server)
        .get('/api/wallet')
        .set('Content-Type', 'application/json')
        .set('authorization', token_two)
        .end(function(err, res) {
        if (err) throw err;
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Wallet fetched successfully');
          expect(res.body.data).to.be.an('array');
          expect(res.body.code).to.equal(200);
          done();
        });
    });
  });

   describe('Transaction Endpoints', () => {
    it('create a transaction - transfer with wrong address /api/transaction', function (done) {
      chai.request(server)
        .post('/api/transaction')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({
            'amount': 10000,
            'source_address': '3e71c7e1-5453-4388-aeb3-8e5437433349',
            'destination_address': '8c8ec9fd-deb5-4e97-9369-a9a62068f480',
            'type': 'transfer',
            'currency': 'bitcoin'
        })
        .end(function(err, res) {
        if (err) throw err;
          expect(res.body.message).to.equal('Invalid source or destination address');
          expect(res.body.status).to.equal('error');
          expect(res.body.code).to.equal(400);
          done();
        });
    });

     it('create a transaction - transfer with right address but insufficient funds /api/transaction', function (done) {
      chai.request(server)
        .post('/api/transaction')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({
            'amount': 10000,
            'source_address': user_one_address,
            'destination_address': user_two_address,
            'type': 'transfer',
            'currency': 'ethereum'
        })
        .end(function(err, res) {
        if (err) throw err;
          expect(res.body.message).to.equal('Insufficient funds');
          expect(res.body.status).to.equal('error');
          expect(res.body.code).to.equal(400);
          done();
        });
    });

     it('create a transaction - transfer to same address /api/transaction', function (done) {
      chai.request(server)
        .post('/api/transaction')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({
            'amount': 1000,
            'source_address': user_one_address,
            'destination_address': user_one_address,
            'type': 'transfer',
            'currency': 'ethereum'
        })
        .end(function(err, res) {
        if (err) throw err;
          expect(res.body.message).to.equal('Invalid transaction. You cant transfer or withdraw from source to source');
          expect(res.body.status).to.equal('error');
          expect(res.body.code).to.equal(400);
          done();
        });
    });

     it('create a transaction - transfer with right address /api/transaction', function (done) {
      chai.request(server)
        .post('/api/transaction')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({
            'amount': 1000,
            'source_address': user_one_address,
            'destination_address': user_two_address,
            'type': 'transfer',
            'currency': 'ethereum'
        })
        .end(function(err, res) {
        if (err) throw err;
          expect(res.body.message).to.equal('Transaction has been processed');
          expect(res.body.status).to.equal('success');
          expect(res.body.code).to.equal(200);
          done();
        });
    });
  });
});