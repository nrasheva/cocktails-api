const express = require('express');
const { getCocktail, getCocktails } = require('./handlers/cocktails');

const router = express.Router();

router.get('/getCocktail', getCocktail);
router.get('/getCocktails', getCocktails);

module.exports = router;
