const axios = require("axios");
const { Country,Activity } = require("../db");

const URL = "https://localhost:3001/countries";

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Country.findOne({ where: { id }, include: Activity });
    if (data) {
      return res.json(data);
    }
    return res.status(404).send("Country not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
