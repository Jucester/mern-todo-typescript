import request, { agent } from 'supertest';
import { connectDB, clearDB, closeDB } from '../configs/database';
import app from '../app';
import Task from '../models/Task';


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

const postAuth = async (credentials : object) => {
    let agent = request(app).post('/api/1.0/auth/signIn');
    return await agent.send(credentials);
}

const addTasks = async (count : number, id : string) => {
   
    for (let i = 0; i < count; i++) {
        const task = new Task({
            title: `Task ${i}`,
            description: `Description Task ${i}`,
            userId: id
        });
        await task.save();
    }

};

const getTasks = (token : string) => {
    const agent = request(app).get('/api/1.0/tasks').set('x-auth-token', token);
    return agent.send();
};

describe('Listing tasks', () => {

    it('returns 200 ok when user doest not have tasks', async() => {
        await addUser();
        const user = await postAuth({ email: 'user1@test.com', password: 'Password*123'} );
        const token = user.body.token;
        const response = await getTasks(token);
        expect(response.status).toBe(200);
    });

    it('returns 10 tasks in page content when user have 11 tasks or more', async() => {
        const register = await addUser();
        const id = register.body.user
        await addTasks(11, id);
        
        const auth = await postAuth({ email: 'user1@test.com', password: 'Password*123'} );
        const token = auth.body.token;
        
        const response = await getTasks(token);
       
        expect(response.status).toBe(200);
        expect(response.body.tasks.length).toBe(10);
    })

});

describe('Creating tasks', () => {

    const addTask = async(task : object = null, token : string) => {
        const agent = request(app).post('/api/1.0/tasks').set('x-auth-token', token);
        return await agent.send(task);
    }

    it('returns 200 ok when add task is sent with correct params', async() => {
        await addUser();
        const response = await postAuth({ email: 'user1@test.com', password: 'Password*123'} );
        const token = response.body.token;
        const id = response.body.user.id;

        const post = await addTask({
            title: 'Task',
            description: 'Description Task',
            userId: id
        }, token);

        expect(post.status).toBe(200);
    });

    it('returns 401 when trying to add task without authentication', async() => {
        const post = await request(app).post('/api/1.0/tasks').send({
            title: 'Task',
            description: 'Description Task',
            userId: '123'
        });

        expect(post.status).toBe(401);
    });

    it('returns errors array when add task is sent without correct or null params', async() => {
        await addUser();
        const response = await postAuth({ email: 'user1@test.com', password: 'Password*123'} );
        const token = response.body.token;
        const id = response.body.user.id;

        const post = await addTask({}, token);

        expect(post.status).toBe(400);
        expect(post.body.errors.length).toBeGreaterThan(0);
    })
});

describe('Update tasks', () => {

    const putTask = async(id : string = '123', token : string = null, body : object = null) => {
        let agent = request(app).put(`/api/1.0/tasks/${id}`);
        
        if (token) {
            agent.set('x-auth-token', token);
        }

        return await agent.send(body);
    }

    it('returns 200 ok when valid request is sent by correct user', async() => {
        await addUser();
        const auth = await postAuth({ email: 'user1@test.com', password: 'Password*123'} );
        const token = auth.body.token;
        const id = auth.body.user.id;

        await addTasks(3, id);

        let response = await getTasks(token);
        const taskId = response.body.tasks[0]._id;

        await putTask(taskId, token, { title: "Task Updated", description: "Description updated"});
      
        response = await getTasks(token);
   
        expect(response.body.tasks[0].title).toBe("Task Updated");
    });

    it('returns 401 when trying to update task without authorization', async() => {
        const response = await putTask();
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it('returns errors array when request is sent without valid body', async() => {
        await addUser();
        const auth = await postAuth({ email: 'user1@test.com', password: 'Password*123'} );
        const token = auth.body.token;
        const id = auth.body.user.id;

        await addTasks(3, id);

        let task = await getTasks(token);
        const taskId = task.body.tasks[0]._id;

        const response = await putTask(taskId, token, {});
        
        expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it('returns 403 if request is sent with valid params but by another user', async() => {
        // Adding two users
        await addUser();
        await addUser({
            username: 'user2',
            email: 'user2@test.com',
            password: 'Password*123'
        });

        // First login with the first user to get their token and id
        const firstUser = await postAuth({ email: 'user1@test.com', password: 'Password*123'} );
        const firstToken = firstUser.body.token;
        const firstId = firstUser.body.user.id;

        // And add three tasks with their id
        await addTasks(3, firstId);

        // Second login with the second user and get their token
        const secondUser = await postAuth({ email: 'user2@test.com', password: 'Password*123'} );
        const secondToken = secondUser.body.token;
      
        // Get the tasks from the first user to take an id to test
        let response = await getTasks(firstToken);
        const taskId = response.body.tasks[0]._id;

        // Then try to update the task with the token from the second user
        response = await putTask(taskId, secondToken, { title: "Task Updated", description: "Description updated"});
        
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Unauthorized");
    });

});

// describe('Deleting tasks', () => {

// });

