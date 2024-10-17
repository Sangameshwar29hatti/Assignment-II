const { getWeatherData } = require('./api');
const { processWeatherData } = require('./processing');
const { checkThresholdBreach } = require('./alerting');
const config = require('../config.json');

async function runWeatherMonitoring() {
  const cities = config.cities;
  
  for (const city of cities) {
    try {
      const weatherData = await getWeatherData(city);
      const processedData = processWeatherData(weatherData);
      console.log(`Weather in ${city}:`, processedData);
      
      const alert = checkThresholdBreach(processedData);
      if (alert) console.log(alert);
      
    } catch (error) {
      console.error(`Error processing weather data for ${city}: ${error.message}`);
    }
  }
}

setInterval(runWeatherMonitoring, 300000); // Run every 5 minutes
runWeatherMonitoring(); // Initial run
