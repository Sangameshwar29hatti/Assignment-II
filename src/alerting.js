const config = require('../config.json');

function checkThresholdBreach(data) {
  const threshold = config.alert_threshold.temp;
  if (data.temp > threshold) {
    return `Alert: Temperature exceeded ${threshold}°C in ${data.city}`;
  }
  return null;
}

module.exports = { checkThresholdBreach };
