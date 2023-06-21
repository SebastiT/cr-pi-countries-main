const { Router } = require("express");
const getAllCountries = require("../controllers/getAllCountries")
const getCountriesById = require("../controllers/getCountriesById")
const getCountriesByName = require("../controllers/getCountriesbyName")
const postActivities = require("../controllers/postActivities")
const getAllActivities = require("../controllers/getAllActivities")

const router = Router();


router.get("/countries",getAllCountries)

router.get("/countries/name",getCountriesByName);

router.get("/countries/:id",getCountriesById);

router.post("/activities",postActivities);

router.get("/activities",getAllActivities);



module.exports = router;
