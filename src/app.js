const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getGeocode = require('./utils/geocode');
const getForecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Sagnik.C',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Sagnik.C',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'All the help you need are here. Just kidding!',
    title: 'Help',
    name: 'Sagnik.C',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  getGeocode(address, (geoError, { latitude, longitude, location } = {}) => {
    if (geoError) {
      return res.send({
        error: geoError,
      });
    }

    getForecast(
      latitude,
      longitude,
      (forecastErr, { currentTemparature, feelsLike }) => {
        if (forecastErr) {
          return res.send({
            error: forecastErr,
          });
        }

        res.send({
          forecast: `It is ${currentTemparature} degrees out. It feels like ${feelsLike}.`,
          location,
          address,
        });
      }
    );
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Page not found!',
    errorMessage: 'Not a valid help page!',
    name: 'Sagnik.C',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found!',
    errorMessage: 'Lost? Click on the links above to navigate.',
    name: 'Sagnik.C',
  });
});

app.listen(3000, () => {
  console.log('Server up in port 3000...');
});
