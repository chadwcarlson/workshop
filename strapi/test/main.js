let supertest = require('supertest');

let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);
let timeout = 10000;

let api;

if (process.env.PORT) {
    api = supertest(process.env.PUBLIC_URL);
} else {
    api = supertest("localhost:1337")
}

describe('Verify collection endpoints are accessible', () => {

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
    
})