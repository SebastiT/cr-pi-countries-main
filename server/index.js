const server = require("./src/server");
const { conn, Country } = require("./src/db.js");
const axios = require("axios");
const PORT = 3001;

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, async () => {
      const dbCountries = await Country.findAll();

      if (!dbCountries.length) {
        const countriesAPI = await axios.get("http://localhost:5000/countries");
        await countriesAPI.data.forEach((country) => {
          Country.create({
            id: country.cca3,
            name: country.name.common,
            flag: country.flags.svg,
            continent:country.continents[0],
            capital: country.capital ? country.capital : ["Capital Not Found"],
            subregion: country.subregion ? country.subregion : "Subregion Not Found",
            area:country.area,
            population:country.population,
          })
        })
      };

      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
