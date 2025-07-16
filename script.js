// Replace with your own OpenWeatherMap API key — do NOT commit your real one!
const API_KEY = 'ssh-its-a-s3cr3t'; 
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const resultDiv = document.getElementById('weatherResult');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();

    const html = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temp:</strong> ${data.main.temp} °C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    `;
    resultDiv.innerHTML = html;
  } catch (err) {
    resultDiv.innerHTML = `<p style="color: red;">${err.message}</p>`;
  }
}
