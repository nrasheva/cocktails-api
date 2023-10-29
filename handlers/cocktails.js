const cocktails = require('../data/cocktails');

function getCocktail(req, res) {
  const id = req.query.id;

  if (!id) {
    res.status(400).json({ message: 'id parameter not provided' });
    return;
  }

  const cocktail = cocktails.find((cocktail) => cocktail.id === id);

  if (cocktail === undefined) {
    res.status(404).json({ message: 'cocktail not found' });
    return;
  }

  res.send(cocktail);
}

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

module.exports = { getCocktail, getCocktails };
