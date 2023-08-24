const express = require('express');
const { getCocktails } = require('./handlers/cocktails');

const router = express.Router();

router.get('/getCocktails', getCocktails);

module.exports = router;
