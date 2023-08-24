const cocktails = require('../data/cocktails');

const keys = ['id', 'img', 'level', 'name', 'taste'];

function getCocktails(req, res) {
  // Return only the necessary keys, it will be updated when a DB is implemented
  const summarized = cocktails.map((cocktail) =>
    keys.reduce((newObj, key) => {
      if (cocktail.hasOwnProperty(key)) {
        newObj[key] = cocktail[key];
      }
      return newObj;
    }, {})
  );

  res.send(summarized);
}

module.exports = { getCocktails };
