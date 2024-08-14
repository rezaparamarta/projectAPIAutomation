import * as chai from 'chai';
import chaiJsonSchemaAjv from 'chai-json-schema-ajv';
import supertest from 'supertest';
import baseUrl from '../env.js';

const expect = chai.expect;
chai.use(chaiJsonSchemaAjv);

const request = supertest(baseUrl);

describe('Unit Test API untuk Memeriksa Testing Assertion', () => {

    it('Return response code with 204', async () => {
        const response = await request.delete('/api/users/2').set('Content-Type', 'application/json');
        expect(response.status).to.equal(204);
        console.log('Status Respons:', response.status);
    });
});
