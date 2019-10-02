const express = require("express");
const fs = require('fs');
const cors = require('cors')
const Chalk = require("chalk");
const config = require("./config");
const cities = require("./data/city.list.json")
const app = express();

app.use(cors());

app.get("/autocomplete/cities", (req, res) => {
  const query = req.query;

  if (Object.keys(query).length !== 0) {
    let autoCompleteCities = cities
        .filter(
          (city) => {
            for (prop in query) {
              return city[prop].toLowerCase().includes(query[prop].toLowerCase())
            }
          })
        .sort((firstCity, secondCity) => firstCity.name.localeCompare(secondCity.name))

    if (query.maxElements && autoCompleteCities.length > query.maxElements)
      autoCompleteCities = autoCompleteCities.slice(0, query.maxElements)
          
    res.json(autoCompleteCities);
  } else {
    res.json([])
  }
});

app.get("/city/:id", (req, res) => {
    const id = Number(req.params.id);

    if (id) {
      const city = cities.find((city) => city.id === id)
      const { geoname, stat, stations, zoom, ...filteredCity } = city;

      if (city)
        res.json(filteredCity)
      else
        res.status(404).end()
    } else {
      res.status(400).end()
    }
})
  

app.listen(config.port, err => {
  if (err) {
    console.error(Chalk.bgRed(err));
  } else {
    console.info(
      Chalk.black.bgGreen(
        `\n\n💂  Listening at http://localhost:${config.port}\n`
      )
    );
  }
});
