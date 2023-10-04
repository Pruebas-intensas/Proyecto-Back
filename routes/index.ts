let { Router } = require('express');

const router = new Router();

// Rutas
router.use('/admin', require('./admin'));

module.exports = router;