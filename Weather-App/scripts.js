const apikey = "9037e598a542432faf063205240609"
const getWeatherBtn = document.getElementById('getWeatherBtn')

const cityInput = document.getElementById('cityInput')
const weatherResult = document.getElementById('weatherResult')

async function getWeather(city) {
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`;

    try{
        const response = await fetch(apiURL);
        const data = await response.json(); 
        console.log('API Response:', data); 
       
        if (data && data.current) {
            displayWeather(data);
        } else {
            weatherResult.innerHTML = `<p class="error">No data received.</p>`;
        }
    }catch (error) {
        console.log("Error fetching data", error);
      }

}


function displayWeather(data) {

    const location = {
        name: data.location.name || 'N/A',
        country: data.location.country || 'N/A',
        lat: data.location.lat || 'N/A',
        lon: data.location.lon || 'N/A',
        localtime: data.location.localtime || 'N/A'
      };
    
    
      const current = {
        temp: data.current.temp_c || 'N/A',
        condition: data.current.condition.text || 'N/A',
        icon: `http:${data.current.condition.icon}` || '', // Ensure icon URL is valid
        windSpeed: data.current.wind_kph || 'N/A',
        pressure: data.current.pressure_mb || 'N/A',
        humidity: data.current.humidity || 'N/A',
        visibility: data.current.vis_km || 'N/A'
      };

      const weatherInfo = `
      <h2>${location.name}, ${location.country}</h2>
      <p class="weather-info"><strong>Temperature:</strong> ${current.temp}°C</p>
      <p class="weather-info"><strong>Condition:</strong> ${current.condition}</p>
      <img src="${current.icon}" alt="${current.condition}">
      <p class="weather-info"><strong>Wind Speed:</strong> ${current.windSpeed} m/s</p>
      <p class="weather-info"><strong>Pressure:</strong> ${current.pressure} hPa</p>
      <p class="weather-info"><strong>Humidity:</strong> ${current.humidity}%</p>
      <p class="weather-info"><strong>Visibility:</strong> ${current.visibility} km</p>
      <p class="weather-info"><strong>Local Time:</strong> ${location.localtime}</p>
    `;

    if (weatherResult) {
        weatherResult.innerHTML = weatherInfo;
    } else {
        console.log('weatherResult element is null.');
    }
  }

  getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    } else {
      weatherResult.innerHTML = '<p class="error">Please enter a city name</p>';
    }
  });