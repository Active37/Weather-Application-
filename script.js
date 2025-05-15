const apiKey = '8241d18749c94b7a8f676232c3f59195'; 

async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');
  resultDiv.innerHTML = 'Loading...';

  if (!location) {
    resultDiv.innerHTML = 'Please enter a location.';
    return;
  }

  try {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`);
    const geoData = await geoRes.json();
    console.log('GeoData:', geoData);

    if (!geoData || geoData.length === 0) {
      resultDiv.innerHTML = 'Location not found.';
      return;
    }

    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    
    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data || !data.data.values) {
      throw new Error('No weather data found.');
    }

    const weather = data.data.values;

    resultDiv.innerHTML = `
      <h2>Weather in ${location}</h2>
      <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
      <p><strong>Humidity:</strong> ${weather.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${weather.windSpeed} m/s</p>
      <p><strong>Cloud Cover:</strong> ${weather.cloudCover}%</p>
    `;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = 'Error fetching weather. Try again.';
  }
}
