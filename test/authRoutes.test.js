const request = require('supertest');
const app = require('../app');

describe('Authentication Routes', () => {
  it('should register a new user with unique email', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        Name: 'Test User',
        Email: 'unique@example.com', // Use a unique email address for testing
        Password: 'P@ssword123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body).toHaveProperty('userID');
  });

  it('should return an error when registering with an existing email', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        Name: 'Test User',
        Email: 'unique@example.com', // Use the same email address as before
        Password: 'P@ssword123'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Email already exists');
  });

  it('should return error for missing fields during registration', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        Name: 'Test User',
        // Missing Email and Password
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Name, Email, and Password are required fields');
  });
});
