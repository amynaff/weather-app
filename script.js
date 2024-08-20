const apiKey = '925093d5a1db9487a10d8aa4cdfd3390'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weather-info');
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  }
});

async function fetchWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === '404') {
      weatherInfo.innerHTML = 'City not found';
    } else {
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      const humidity = data.main.humidity;

      weatherInfo.innerHTML = `
                <h2>${data.name}</h2>
                <p>Weather: ${weather}</p>
                <p>Temperature: ${temp}°C</p>
                <p>Humidity: ${humidity}%</p>
            `;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfo.innerHTML = 'An error occurred while fetching weather data';
  }
}
