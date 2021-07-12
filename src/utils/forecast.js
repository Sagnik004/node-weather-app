const request = require('request');

const getForecast = (latitude, longitude, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=585b239b714ba1d561149eb9ab7da870&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      cb('Unable to connect to weather service');
      return;
    }
    if (response.body.error) {
      cb('Unable to find location!');
      return;
    }

    cb(undefined, {
      currentTemparature: response.body.current.temperature,
      feelsLike: response.body.current.feelslike,
    });
  });
};

module.exports = getForecast;
