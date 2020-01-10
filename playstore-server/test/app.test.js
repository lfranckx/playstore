const app = require('../app');
const { expect } = require('chai');
const supertest = require('supertest');

// describe('GET /apps', ( => {
//     it('should get an array of apps', () => {
//         return supertest(app)
//             .get('/apps')
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .then(res => {

//             })
//     })
// })