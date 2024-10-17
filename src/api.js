require('dotenv').config();
const axios = require('axios');
const config = require('../config.json');

const API_KEY = process.env.OPENWEATHER_API_KEY;

async function getWeatherData(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data: ${error.message}`);
    throw error;
  }
}

module.exports = { getWeatherData };
