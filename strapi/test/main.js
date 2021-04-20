// let should = require('chai').should();
// let expect = require('chai').expect;
let supertest = require('supertest');

let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);
let timeout = 5000;

let api;

if (process.env.PORT) {
    api = supertest(`localhost:${process.env.PORT}`);
} else {
    api = supertest("localhost:1337")
}

describe('Verify collection endpoints are accessible', () => {

    describe("Test GET route /categories", () => {

        it("find", function (done) {
            this.timeout(timeout);
            api.get('/categories')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('array');
            done();
            })
        })

        it("findone", function (done) {
            this.timeout(5000);
            api.get('/categories/1')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        })
    })

    describe("Test GET route /histories", () => {

        it("find", function (done) {
            this.timeout(5000);
            api.get('/histories')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(403);
                response.body.should.be.a('object');
            done();
            })
        })

        it("findone", function (done) {
            this.timeout(5000);
            api.get('/histories/1')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(403);
                response.body.should.be.a('object');
            done();
            })
        })
    })

    describe("Test GET route /likes", () => {

        it("find", function (done) {
            this.timeout(5000);
            api.get('/likes')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
            done();
            })
        })

        it("findone", function (done) {
            this.timeout(5000);
            api.get('/likes/1')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        })
    })
    
    describe("Test GET route /restaurants", () => {

        it("find", function (done) {
            this.timeout(5000);
            api.get('/restaurants')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
            done();
            })
        })

        it("findone", function (done) {
            this.timeout(5000);
            api.get('/restaurants/1')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        })
    })

    describe("Test GET route /reviews", () => {

        it("find", function (done) {
            this.timeout(5000);
            api.get('/reviews')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
            done();
            })
        })

        it("findone", function (done) {
            this.timeout(5000);
            api.get('/reviews/1')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        })
    })

    describe("Test GET route /universals", () => {

        it("find", function (done) {
            this.timeout(5000);
            api.get('/universals')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
            done();
            })
        })

        it("findone", function (done) {
            this.timeout(5000);
            api.get('/universals/1')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        })
    })

    describe("Test GET route /users", () => {

        it("find", function (done) {
            this.timeout(5000);
            api.get('/users')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(403);
                response.body.should.be.a('object');
            done();
            })
        })

        it("findone", function (done) {
            this.timeout(5000);
            api.get('/users/1')
            .set('Accept', 'application/json')
            .end((err, response) => {
                response.should.have.status(403);
                response.body.should.be.a('object');
            done();
            })
        })
    })
})