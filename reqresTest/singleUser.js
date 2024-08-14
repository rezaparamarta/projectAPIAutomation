import * as chai from 'chai';
import chaiJsonSchemaAjv from 'chai-json-schema-ajv';
import supertest from 'supertest';
import baseUrl from '../env.js';

const expect = chai.expect;
chai.use(chaiJsonSchemaAjv);

const request = supertest(baseUrl);

describe('Unit Test API untuk Memeriksa JSON Schema and Testing Assertion', () => {
    // Skema JSON
    const definedSchema = {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "id": { "type": "integer" },
            "email": { "type": "string" },
            "first_name": { "type": "string" },
            "last_name": { "type": "string" },
            "avatar": { "type": "string" }
          },
          "required": ["id", "email", "first_name", "last_name", "avatar"]
        },
        "support": {
          "type": "object",
          "properties": {
            "url": { "type": "string" },
            "text": { "type": "string" }
          },
          "required": ["url", "text"]
        }
      },
      "required": ["data", "support"]
    };

    it('This must return status code of 200', async function() {
        const response = await request.get('/api/users/2');
        expect(response.status).to.equal(200);
    });

    it('This assertion must validate defined JSON schema', async function() {
        const response = await request.get('/api/users/2');
        expect(response.body).to.be.jsonSchema(definedSchema);
    });

    it('Mengembalikan Data yang Benar untuk User dengan ID 2', async () => {
        const response = await request.get('/api/users/2').set('Content-Type', 'application/json');
        expect(response.status).to.equal(200);
        expect(response.body.data.id).to.equal(2);
        expect(response.body.data.email).to.equal("janet.weaver@reqres.in");
        console.log('Status Respons:', response.status);
        console.log('Body Respons:', response.body);
    });
});
