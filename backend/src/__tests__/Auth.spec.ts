import request from 'supertest';
import { connectDB, clearDB, closeDB } from '../configs/database';
import app from '../app';


beforeAll( () => {
    connectDB();
    jest.setTimeout(30000);
});

beforeEach( () => {
    clearDB();
});

afterAll( () => {
    closeDB();
    jest.setTimeout(5000);
});

const validUser = {
    username: 'user1',
    email: 'user1@test.com',
    password: 'Password*123'
}

const addUser = async (user : object = {...validUser}) => {
    let agent = request(app).post('/api/1.0/auth/signUp');
    return await agent.send(user);
}

const postAuth = async (credentials : object ) => {
    let agent = request(app).post('/api/1.0/auth/signIn');
    return await agent.send(credentials);
}

describe('Authentication', () => {
    it('returns 200 ok when credentials are correct', async() => {
        await addUser();
        const response = await postAuth( { email: 'user1@test.com', password: 'Password*123'} );
        //console.log(response.body);
        expect(response.status).toBe(200);
    });

    it('returns 401 and "user does not exists" message when unregistered email is provided', async() => {
        const response = await request(app).post('/api/1.0/auth/signIn').send(
            { email: 'not_user@test.com', password: 'Password*123'}
        );
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User doest not exists');
    });

    it('returns json web token when credentials are correct', async() => {
        await addUser();
        const response = await postAuth( { email: 'user1@test.com', password: 'Password*123'} );
        expect(response.body.token).not.toBeUndefined();
    });

    it('returns 401 and "Invalid credentials" when password is wrong', async() => {
        await addUser();
        const response = await postAuth( { email: 'user1@test.com', password: 'Password*Wrong'} );
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });

    it('returns errors array when data is not provided in login', async() => {
        await addUser();
        const response = await postAuth({});
        expect(response.body.errors.length).toBeGreaterThan(0);
    })
})