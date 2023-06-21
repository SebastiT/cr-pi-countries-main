const { Activity } = require("../db");

module.exports = async (req, res) => {
  const { name, difficulty, duration, season, countriesId } = req.body;
  console.log(name);
  try {
    let newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    countriesId.forEach(
      async (country) => await newActivity.addCountry(country)
    );

    res.send("Activity created");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
