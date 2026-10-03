const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

beforeAll(async () => {
    await mongoose.connect(
        process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/productdb_test',
        { serverSelectionTimeoutMS: 10000 }
    );
}, 30000);

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

describe('Product CRUD', () => {
    const item = { pid: 'T01', pname: 'Keyboard', price: 50, quantity: 10 };

    test('CREATE trả 201', async () => {
        const res = await request(app).post('/api/products').send(item);
        expect(res.statusCode).toBe(201);
        expect(res.body.pid).toBe('T01');
    });

    test('READ trả đúng sản phẩm', async () => {
        const res = await request(app).get('/api/products/T01');
        expect(res.statusCode).toBe(200);
        expect(res.body.pname).toBe('Keyboard');
    });

    test('UPDATE đổi giá', async () => {
        const res = await request(app).put('/api/products/T01').send({ price: 60 });
        expect(res.statusCode).toBe(200);
        expect(res.body.price).toBe(60);
    });

    test('DELETE rồi READ trả 404', async () => {
        const del = await request(app).delete('/api/products/T01');
        expect(del.statusCode).toBe(200);
        const again = await request(app).get('/api/products/T01');
        expect(again.statusCode).toBe(404);
    });
});