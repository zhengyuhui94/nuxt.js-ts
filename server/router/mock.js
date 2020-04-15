const express = require('express');
const router = express.Router();

router.get('/goodname', (req, res) => {
    res.json({
        name: '鸡腿'
    });
});

module.exports = router;

