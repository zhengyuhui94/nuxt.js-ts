const express = require('express');
const router = express.Router();

router.get('/goodname', (req, res) => {
    res.json({
        code: 0,
        name: '鸡腿'
    });
});

module.exports = router;

