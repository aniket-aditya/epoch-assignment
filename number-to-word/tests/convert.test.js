const request = require('supertest');
const app = require('../src/app');

describe('POST /convert', () => {
  it('should return the word representation of a valid number', async () => {
    const res = await request(app).post('/convert').send({ number: 123 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('success');
    expect(res.body.words).toBe('one hundred twenty-three');
  });

  it('should return error for a number out of range', async () => {
    const res = await request(app).post('/convert').send({ number: 1000 });

    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toBe('error');
  });

  it('should return error for non-integer input', async () => {
    const res = await request(app).post('/convert').send({ number: 12.34 });

    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toBe('error');
  });
});
