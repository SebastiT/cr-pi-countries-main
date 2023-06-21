const { Country } = require("../db");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { name } = req.query;
  console.log(name);
  try {
    const matchingCountries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    });
    if (matchingCountries.length) {
      return res.json(matchingCountries)
    }
    return res.status(404).send(`Countries with "${name}" in the name were not found`)
  } catch (error) {
        return res.status(500).send(error.message);
  }
};
 