const { kelvinToCelsius } = require('./utils');

function processWeatherData(data) {
  return {
    temp: kelvinToCelsius(data.main.temp),
    feels_like: kelvinToCelsius(data.main.feels_like),
    weather: data.weather[0].main,
    time: data.dt,
  };
}

function calculateDailySummary(dailyData) {
  const temps = dailyData.map(d => d.temp);
  return {
    average_temp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(2),
    max_temp: Math.max(...temps).toFixed(2),
    min_temp: Math.min(...temps).toFixed(2),
    dominant_condition: getDominantCondition(dailyData)
  };
}

function getDominantCondition(data) {
  const conditions = data.reduce((acc, d) => {
    acc[d.weather] = (acc[d.weather] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(conditions).reduce((a, b) => conditions[a] > conditions[b] ? a : b);
}

module.exports = { processWeatherData, calculateDailySummary };
