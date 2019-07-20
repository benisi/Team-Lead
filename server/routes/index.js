const router = require('express').Router();

router.get('/', async (req, res) => {
    res.status(200).send('Hello Ben');
});

module.exports = router;