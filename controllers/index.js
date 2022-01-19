const router = require('express').Router();

const reviewRoutes = require('./api/review-routes');
const strainRoutes = require('./api/strain-routes');
const userRoutes = require('./api/user-routes');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api/review', reviewRoutes);
router.use('/api/strain', strainRoutes);
router.use('/api/user', userRoutes);

module.exports = router;
