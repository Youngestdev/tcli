const Twitter = require("twitter");

const config = {
  consumer_key: YOUR_CONSUMER_KEY,
  consumer_secret: YOUR_CONSUMER_SECRET,
  bearer_token: YOUR_BEARER_TOKEN
};

module.exports = new Twitter(config);
