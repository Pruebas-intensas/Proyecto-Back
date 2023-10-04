let { Router } = require('express');

const router = new Router();

// Rutas
router.use('/admin', require('./admin'));
router.use('/usuario', require('./usuario'));
router.use('/producto', require('./producto'));
router.use('/oferta', require('./oferta'));

module.exports = router;