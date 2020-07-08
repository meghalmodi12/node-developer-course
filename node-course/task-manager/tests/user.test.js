const request = require('supertest');
const app = require('../src/app');

const User = require('../src/models/user');
const userTest = {
    name: 'Test User',
    email: 'test.user@app.com',
    password: 'welcome123'
};

/*
  Before running each test case
    1. Wipe out users before running the 'Should signup a new user' test
    2. Create a dummy user to test features like 
*/
beforeEach(async () => {
    await User.deleteMany({});
    await new User(userTest).save();
});

test('Should signup a new user', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Meghal Modi',
            email: 'meghalmodi12@gmail.com',
            password: 'Scorpio@990'
        })
        .expect(201);
});

test('Should login existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userTest.email,
            password: userTest.password
        })
        .expect(200);
});

test('Should not login nonexisting user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userTest.email,
            password: 'fakepwd@1234'
        })
        .expect(400);
})