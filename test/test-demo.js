const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')

const assert = chai.assert
const BASE_URL = 'https://api.restful-api.dev/';



describe('API Test for restful-api.dev', () => {
    it('Test - GET All Objects', async() => {
        const response = await request(BASE_URL)
        .get('objects')

        //Assertion
        assert.equal(response.statusCode, 200)
        assert.equal(response.body[0].name, 'Google Pixel 6 Pro');
        assert.equal(response.body[0].data.color, 'Cloudy White');
    });

    it('Test - POST Store Objects', async() => {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
         };
        const response = await request(BASE_URL)
        .post('objects')
        .send(body);

        assert.equal(response.statusCode, 200);
        assert.equal(response.body.name, 'Apple MacBook Pro 16');
        assert.equal(response.body.data.year, 2019);


        const schemaFolder = 'resources/jsonSchema/post-object-schema.json'
        const jsonSchema = JSON.parse(fs.readFileSync(schemaFolder, 'utf-8'))

        assert.jsonSchema(response.body, jsonSchema);

    });
});

describe('Test - Global Scope Variable', () => {
    it('This must be return get data', async() => {
        const response = await request(BASE_URL)
        .get('objects')
    });
});
