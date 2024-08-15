const request = require('supertest');
const chai = require('chai');
//chai.assert = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs');

const assert = chai.assert
const BASE_URL = 'https://reqres.in/';

describe('Test Suite CRUD API Reqres', () => {
    it('This must be return call API - single user', async() => {
        const response = await request(BASE_URL)
        .get('api/users/2')
        

        assert.equal(response.status, 200);
        assert.equal(response.body.data.email, 'janet.weaver@reqres.in');
    });

    it('This must be return call API - create user', async() => {
        const body = {
            "name": "morpheus",
            "job": "leader"
        }
        const response = await request(BASE_URL)
        .post('api/users')
        .send(body)

        assert.equal(response.status, 201);
        assert.equal(response.body.name, 'morpheus');
        assert.equal(response.body.job, 'leader');
    });

    it('This must be return call API - update user', async() => {
        const bodyUpdate = {
            "name": "Reza Paramarta",
            "job": "Software Engineer Test Aamiin"
        }
        const response = await request(BASE_URL)
        .put('api/users/2')
        .send(bodyUpdate)

        assert.equal(response.status, 200);
        assert.equal(response.body.name, 'Reza Paramarta');
        assert.equal(response.body.job, 'Software Engineer Test Aamiin');
    });
    it('This must be return API call - delete', async() => {
        const response = await request(BASE_URL)
        .delete('api/users/2')

        assert.equal(response.status, 204);
    });
});

describe('Test suite for jsonSchema', () => {
    it('This must be return API call for check JsonSchema', async() => {
        const response = await request(BASE_URL)
        .get('api/users?page=2')

        assert.equal(response.status, 200);
        
        const schemaFolder = 'resources/jsonSchema/get-object-schema.json'
        const jsonSchema = JSON.parse(fs.readFileSync(schemaFolder, 'utf-8'));

        assert.jsonSchema(response.body, jsonSchema);
    });
});
