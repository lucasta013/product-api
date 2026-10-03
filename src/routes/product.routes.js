const router = require('express').Router();
const Product = require('../models/Product');

// CREATE
router.post('/', async (req, res) => {
    try {
        const p = await Product.create(req.body);
        res.status(201).json(p);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    res.json(await Product.find());
});

// READ ONE
router.get('/:pid', async (req, res) => {
    const p = await Product.findOne({ pid: req.params.pid });

    if (!p) {
        return res.status(404).json({ error: 'Not found' });
    }

    res.json(p);
});

// UPDATE
router.put('/:pid', async (req, res) => {
    try {
        const p = await Product.findOneAndUpdate(
            { pid: req.params.pid },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!p) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(p);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// DELETE
router.delete('/:pid', async (req, res) => {
    const p = await Product.findOneAndDelete({
        pid: req.params.pid
    });

    if (!p) {
        return res.status(404).json({ error: 'Not found' });
    }

    res.json({ message: 'Deleted' });
});

module.exports = router;