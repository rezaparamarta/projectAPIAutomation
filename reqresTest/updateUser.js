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
            "updatedAt": {
                "type": "string"
            }
        },
        "required": [
            "name",
            "job",
            "updatedAt"
        ]
    };

    it('This must return status code of 200', async function() {
        const response = await request.put('/api/users/2')
            .set('Content-Type', 'application/json')
            .send({
                "name": "Reza Paramarta",
                "job": "Software Engineer in Test"
            });
        expect(response.status).to.equal(200);
    });

    it('This assertion must validate defined JSON schema', async function() {
        const response = await request.put('/api/users/2')
            .set('Content-Type', 'application/json')
            .send({
                "name": "Reza Paramarta",
                "job": "Software Engineer in Test"
            });
        expect(response.body).to.be.jsonSchema(jsonSchema);
    });

    it('Return name, job and updatedAt', async () => {
        const response = await request.put('/api/users/2')
            .set('Content-Type', 'application/json')
            .send({
                "name": "Reza Paramarta",
                "job": "Software Engineer in Test"
            });
        console.log('Status Respons:', response.status);
        console.log('Body Respons:', response.body);
        
        // Assertion for make sure that response include these type and value
        expect(response.body).to.have.property('name', 'Reza Paramarta');
        expect(response.body).to.have.property('job', 'Software Engineer in Test');
        expect(response.body).to.have.property('updatedAt');
        
        // Assertion for checking updatedAt
        expect(response.body.updatedAt).to.be.a('string');
    });
});
