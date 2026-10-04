const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());

// liveness: tiến trình còn sống
app.get('/health', (req, res) => res.json({ status: 'ok', version: 2 }));

// readiness: đã kết nối DB chưa (1 = connected)
app.get('/ready', (req, res) => {
    const ok = mongoose.connection.readyState === 1;
    res.status(ok ? 200 : 503).json({ db: ok ? 'connected' : 'disconnected' });
});

app.use('/api/products', productRoutes);

module.exports = app;