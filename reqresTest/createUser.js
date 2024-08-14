import * as chai from 'chai';
import chaiJsonSchemaAjv from 'chai-json-schema-ajv';
import supertest from 'supertest';
import baseUrl from '../env.js';

const expect = chai.expect;
chai.use(chaiJsonSchemaAjv);
const request = supertest(baseUrl);

describe('This is unit test API for check jsonSchema and Assertion', () => {
    const jsonSchema = {
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            },
            "job": {
                "type": "string"
            },
            "id": {
                "type": "string"
            },
            "createdAt": {
                "type": "string"
            }
        },
        "required": [
            "name",
            "job",
            "id",
            "createdAt"
        ]
    };

    it('This must return status code of 201', async function() {
        const response = await request.post('/api/users')
            .set('Content-Type', 'application/json')
            .send({
                "name": "morpheus",
                "job": "leader"
            });
        expect(response.status).to.equal(201);
    });

    it('This assertion must validate defined JSON schema', async function() {
        const response = await request.post('/api/users')
            .set('Content-Type', 'application/json')
            .send({
                "name": "morpheus",
                "job": "leader"
            });
        expect(response.body).to.be.jsonSchema(jsonSchema);
    });

    it('Return Id, name, job and createdAt', async () => {
        const response = await request.post('/api/users')
            .set('Content-Type', 'application/json')
            .send({
                "name": "morpheus",
                "job": "leader"
            });
        console.log('Status Respons:', response.status);
        console.log('Body Respons:', response.body);
        
        // Assertion for make sure that response include these type and value
        expect(response.body).to.have.property('name', 'morpheus');
        expect(response.body).to.have.property('job', 'leader');
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('createdAt');
        
        // Assertion for checking id and createdAt
        expect(response.body.id).to.be.a('string');
        expect(response.body.createdAt).to.be.a('string');
    });
});
