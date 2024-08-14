import * as chai from 'chai';
import chaiJsonSchemaAjv from 'chai-json-schema-ajv';
import supertest from 'supertest';
import baseUrl from '../env.js';  // Pastikan path dan ekstensi file benar

const expect = chai.expect;
chai.use(chaiJsonSchemaAjv);

// Atur host dari API yang akan diuji
const request = supertest(baseUrl);

// Skema JSON yang didefinisikan
const definedSchema = {
    "properties": {
        "page": { "type": "integer" },
        "per_page": { "type": "integer" },
        "total": { "type": "integer" },
        "total_pages": { "type": "integer" },
        "data": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": { "type": "integer" },
                    "email": { "type": "string" },
                    "first_name": { "type": "string" },
                    "last_name": { "type": "string" },
                    "avatar": { "type": "string" }
                },
                "required": ["id", "email", "first_name", "last_name", "avatar"]
            }
        },
        "support": {
            "type": "object",
            "properties": {
                "url": { "type": "string" },
                "text": { "type": "string" }
            },
            "required": ["url", "text"]
        },
    },
    "required": ["page", "per_page", "total", "total_pages", "data", "support"]
};

describe('API Testing', function() {
    it('This must return status code of 200', async function() {
        const response = await request.get('/api/users?page=2');  
        expect(response.status).to.equal(200);
    });

    it('This assertion must validate defined JSON schema', async function() {
        const response = await request.get('/api/users?page=2');  
        expect(response.body).to.be.jsonSchema(definedSchema);
    });
});
