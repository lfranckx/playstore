const app = require('../app');
const { expect } = require('chai');
const supertest = require('supertest');

describe('GET /apps', () => {
    it('should get an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => { //then handler chain together a response
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const app = res.body[0];
                expect(app).to.include.all.keys(
                    'App', 'Genres', 'Price', 'Rating', 'Size', 'Current Ver'
                ); // use first app to test whether all apps contain these keys.
            });
    });
    // The sort query paramter should be one of 'Apps' or 'Ratings'
    // Test to see whether you get a 400 message.
    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'MISTAKE' })
            .expect(400, 'Sort must be one of Rating or App');
    });
    // Check to see if array is sorted.  Cannot be done automatically.
    // You can iterate and check it is sorted by writing the logic manually.
    it('should sort by app name', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'App' }) // if(sort)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                // test application logic here
                let sorted = true;
                let i = 0;
                // iterate once less than the length of the array
                // because we are comparing 2 items at a time
                while (i < res.body.length - 1) {
                    // compare book at 'i' with next book at 'i + 1'
                    const appAtI = res.body[i]
                    const appAtIPlus1 = res.body[i];
                    // if the next book is less than the book at i,
                    if (appAtIPlus1.title < appAtI.title) {
                        // the books were not sorted correctly
                        sorted = false;
                        break; // exit the loop
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            });
    });
})