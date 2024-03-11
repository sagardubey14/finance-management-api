const request = require('supertest');
const app = require('../app');

describe('Transaction Routes', () => {
  it('should add a new transaction', async () => {
    const res = await request(app)
      .post('/transactions')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjYsImlhdCI6MTcxMDE0MjE3MywiZXhwIjoxNzEwMTQ1NzczfQ.fnt4ZkDe1F2qJAmUAmOuhYskYHLkBpOgePwC18gKEs0') // Replace with a valid JWT token
      .send({
        Type: 'income',
        Amount: 100,
        Date: '2024-03-12',
        Description: 'Salary'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Transaction created successfully');
    expect(res.body).toHaveProperty('transactionID');
  });

  it('should retrieve a list of transactions', async () => {
    const res = await request(app)
      .get('/transactions')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjYsImlhdCI6MTcxMDE0MjE3MywiZXhwIjoxNzEwMTQ1NzczfQ.fnt4ZkDe1F2qJAmUAmOuhYskYHLkBpOgePwC18gKEs0') // Replace with a valid JWT token
      .send({ startDate: '2024-03-01', endDate: '2024-03-31' });
    expect(res.statusCode).toEqual(200);
  });

  it('should retrieve a transaction summary', async () => {
    const res = await request(app)
      .get('/transactions/summary')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjYsImlhdCI6MTcxMDE0MjE3MywiZXhwIjoxNzEwMTQ1NzczfQ.fnt4ZkDe1F2qJAmUAmOuhYskYHLkBpOgePwC18gKEs0') // Replace with a valid JWT token
      .query({ startDate: '2024-03-01', endDate: '2024-03-31' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('summary');
    
  },30000);

  it('should delete a specific transaction', async () => {
    // Assuming you have an existing transaction ID to delete
    const transactionIdToDelete = 19;
    const res = await request(app)
      .delete(`/transactions/${transactionIdToDelete}`)
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjYsImlhdCI6MTcxMDE0MjE3MywiZXhwIjoxNzEwMTQ1NzczfQ.fnt4ZkDe1F2qJAmUAmOuhYskYHLkBpOgePwC18gKEs0'); // Replace with a valid JWT token
      console.log(res);
    expect(res.statusCode).toEqual(204);
  });
});
