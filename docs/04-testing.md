# Testing

Were going to add tests and import to Postman

```bash
platform environment:branch tests
```

```
yarn add chai chai-http supertest mocha
mkdir test && touch test/main.js
```

update `package.json` to add test command

```json
  "scripts": {
    "develop": "strapi develop",
    "start": "strapi start",
    "build": "strapi build",
    "strapi": "strapi",
    "lint": "node_modules/.bin/eslint api/**/*.js config/**/*.js plugins/**/*.js",
    "seed": "node scripts/seed.js",
    "test": "mocha"
  },
```

- Create a file that tests just the `/restaurants` endpont.

- find (200, array)
- findone (200, object)

```js
// test/main.js
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
```

If you want to test locally:

- Terminal 1: yarn, yarn develop
- Terminal 2: yarn test

Modify deploy hook 

```yaml
    deploy: |
        set -e

        yarn test
```

- commit, push, watch the test.
- extra, environment-dependent tests

```yaml
    deploy: |
        set -e

        # Run tests on collection endpoints.
        if [ "$PLATFORM_BRANCH" != master ]; then
            yarn test
        fi
```

## Postman

ssh into the `tests` environment container

Strapi automatically generates an OpenAPI Spec for you (show that it's at `extensions/documentation/documentation/1.0.0`)

But we need to make it publicly accessible on P.sh. Add the locations blog

```yaml
# .platform.app.yaml
web:
    commands:
        start: NODE_ENV=production yarn start
    locations:
        # For serving the generated OpenAPI specification as part of the documentation.
        "/docs/spec":
            root: "extensions/documentation/documentation/1.0.0"
            allow: true
            scripts: false
            index:
                - full_documentation.json
```

- commit, push
- view generated spec at `<URL>/docs/spec`

- Extra: set up a workspace on Postman, import that URL
- modify baseURL param, begin writing tests 
- `yarn add newman`

you can then call Postman collection during deploy hook to verify API on each deployment