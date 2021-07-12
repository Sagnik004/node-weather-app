const request = require('request');

const getGeocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2FnbmlrY2hha3JhYm9ydHkiLCJhIjoiY2tqdnZ6N2Q5MGNnODJ1cGd2aHFmN2JnNiJ9.0mka7XAXRdrhp9rKvf1oeg&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      cb('Unable to connect to location service!');
      return;
    }

    if (response.body.features.length === 0) {
      cb('Unable to find location! Please try another search.');
      return;
    }

    cb(undefined, {
      latitude: response.body.features[0].center[1],
      longitude: response.body.features[0].center[0],
      location: response.body.features[0].place_name,
    });
  });
};

module.exports = getGeocode;
