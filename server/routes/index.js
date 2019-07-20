const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send('Hello Ben');
});

module.exports = router;