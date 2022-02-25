const Roles = require('./roles-model')
const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../../server');
const rolesRouter = require('../classes/roles-router')

beforeAll(async ()=> {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('roles').truncate();
});

afterAll(async () => {
    await db.destroy()
})

it('confirm we are using the correct environment', () => {
    expect(process.env.NODE_ENV).toBe('testing');
});

describe('test `roles` model', () => {
    test('test table is empty', async () => {
        const roles = await db('roles');
        expect(roles).toHaveLength(0);
    });

    test('role gets inserted', async () => {
        let result = await Roles.insert({ role_name: 'instructor', role_id: 1 });
        expect(result).toEqual({ role_name: 'instructor', role_id: 1 });
        let roles = await db('roles');
        expect(roles).toHaveLength(1);

        await Roles.insert({ role_name: 'student', role_id: 2});
        roles = await db('roles');
        expect(roles).toHaveLength(2);
    })

    test('can get by id', async () => {
        const {role_id} = await Roles.insert({ role_name: 'admin' });
        const result = await Roles.getById(role_id);
        expect(result).toHaveProperty('role_name', 'admin');
    });

    test('update some roles', async () => {
        const [role_id] = await db('roles').insert({ role_name: 'admin' });
        let result = await Roles.update(role_id, { role_name: 'administrator' });

        expect(result).toEqual({ role_id, role_name: 'administrator' });
        result = await Roles.getById(role_id);
        expect(result).toEqual({ role_id, role_name: 'administrator' });
    });

    test('role removal', async () => {
        let result = await Roles.insert({ role_name: 'student instructor' });
        result = await Roles.getById(result.role_id);
        expect(result).toHaveProperty('role_name', 'student instructor');
        result = await Roles.remove(result.role_id);
        expect(result).toEqual({ role_id: 1, role_name: 'student instructor' });
        result = await Roles.getById(result.role_id);
        expect(result).not.toBeDefined();
    });

})

describe('test server endpoints', () => {
    test('call the `up` endpoint', async () => {
        const result = await request(server).get('/');
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ api: "up" });
    });

    test('[GET] /roles', async () => {
        let result = await request(server).get('/roles');
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
        expect(result.body).toHaveLength(0);

        await Roles.insert({ name: 'instructor' });

        result = await request(server).get('/roles');
        expect(result.body).toHaveLength(1);
    });
})

