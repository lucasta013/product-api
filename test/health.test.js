const request = require('supertest');
const app = require('../src/app');

test('GET /health trả 200 và status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
});