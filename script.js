const rapidApiKey = window.config.RAPID_API_KEY;

if (!rapidApiKey) {
    console.error('RAPID_API_KEY is not configured');
    document.getElementById('weatherResult').innerHTML = 'Error: API key not configured';
}

async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');
  resultDiv.innerHTML = 'Loading...';
  
  if (!location) {
    resultDiv.innerHTML = 'Please enter a location.';
    return;
  }

  try {
    // RapidAPI OpenWeather endpoint
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(location)}`;
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    
    console.log('Request URL:', url);
    
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('API Response:', data);
    
    // Error handling for RapidAPI response
    if (data.error) {
      resultDiv.innerHTML = `Error: ${data.error.message || 'Location not found.'}`;
      return;
    }
    
    
    const locationData = data.location;
    const current = data.current;
    
    resultDiv.innerHTML = `
      <h2>Weather in ${locationData.name}, ${locationData.country}</h2>
      <p class="description">${current.condition.text}</p>
      <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
      <p><strong>Feels like:</strong> ${current.feelslike_c}°C</p>
      <p><strong>Humidity:</strong> ${current.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${current.wind_kph} km/h</p>
    `;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = 'Error fetching weather. Please try again.';
  }
}