const request = require('supertest');
const app = require('../app');

describe('Authentication Routes', () => {

it('should return error for invalid email format during registration', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        Name: 'Test User',
        Email: 'invalidemail', // Invalid email format
        Password: 'P@ssword123'
      });
      console.log(res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Invalid email format');
  });

  it('should return error for weak password during registration', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        Name: 'Test User',
        Email: 'test@example.com',
        Password: 'weakpassword' // Weak password
      });
      console.log(res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character');
  });
});