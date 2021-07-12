const weatherForm = document.querySelector('form');
const locationAddress = document.getElementById('locationAddress');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const address = locationAddress.value;
  displayForecast(address);
});

function displayForecast(address) {
  resetScreen();
  if (!address) {
    message1.textContent = 'Please provide a location to search!';
    message1.classList.add('red');
    return;
  }
  getForecast(address)
    .then(({ forecast, location }) => {
      message1.textContent = forecast;
      message2.textContent = location;
    })
    .catch(({ error }) => {
      message1.textContent = error;
      message1.classList.add('red');
    });
}

function resetScreen() {
  message1.textContent = 'Loading...';
  message2.textContent = '';
  message1.classList.remove('red');
}

function getForecast(address) {
  return new Promise((resolve, reject) => {
    fetch(`/weather?address=${address}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          reject({
            error: data.error,
          });
        }
        resolve({
          forecast: data.forecast,
          location: data.location,
          address: data.address,
        });
      });
  });
}
