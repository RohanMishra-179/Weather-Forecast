const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const weatherCondition = document.getElementById('condition');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const errorMessage = document.getElementById('error-message');

const forecastItems = [
    { day: 'Day 1', icon: 'forecast-icon-1', temp: 'forecast-temp-1' },
    { day: 'Day 2', icon: 'forecast-icon-2', temp: 'forecast-temp-2' },
    { day: 'Day 3', icon: 'forecast-icon-3', temp: 'forecast-temp-3' },
    { day: 'Day 4', icon: 'forecast-icon-4', temp: 'forecast-temp-4' },
    { day: 'Day 5', icon: 'forecast-icon-5', temp: 'forecast-temp-5' },
];

searchButton.addEventListener("click", getWeatherData);

async function getWeatherData() {
    const city = searchInput.value;
    if (!city) {
        errorMessage.innerHTML = "Please enter a valid city name!";
        return;
    }
    try {
        const apiKey = '029f4bdd006c3a2b23b66db3d84ed590'; // Replace with your API key
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!currentWeatherResponse.ok) {
            throw new Error("City not found");
        }
        const currentWeather = await currentWeatherResponse.json();
        
        cityName.innerHTML = currentWeather.name;
        weatherIcon.src = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;
        weatherCondition.innerHTML = currentWeather.weather[0].description;
        temperature.innerHTML = `Temperature: ${currentWeather.main.temp}°C`;
        humidity.innerHTML = `Humidity: ${currentWeather.main.humidity}%`;
        windSpeed.innerHTML = `Wind Speed: ${currentWeather.wind.speed} km/h`;
        
        // Fetch and display forecast data
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();
        
        forecastItems.forEach((item, index) => {
            const forecast = forecastData.list[index * 8]; // Forecast data is available every 3 hours, so index * 8 gives daily forecast
            document.getElementById(item.icon).src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
            document.getElementById(item.temp).innerHTML = `${forecast.main.temp}°C`;
        });
    } catch (error) {
        errorMessage.innerHTML = error.message;
    }
}
