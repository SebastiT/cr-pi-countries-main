const { Activity, Country } = require("../db");

module.exports = async (req,res) => {
  try {
    const allActivities = await Activity.findAll({include: Country});
    return res.json(allActivities);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

