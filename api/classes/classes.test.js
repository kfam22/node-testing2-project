const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../../server');

it('confirm we are using the correct environment', () => {
    expect(process.env.NODE_ENV).toBe('testing');
});

