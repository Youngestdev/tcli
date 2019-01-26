const Twitter = require("twitter");

const config = {
  consumer_key: `wFQ0feA3OtlSa8uBy5qlAg7kv`,
  consumer_secret: `mKJPPrzYvJ5k9ly9vgtTXWbafhOjlkipn2fp4SjRyo7Y69HGTo`,
  bearer_token: `AAAAAAAAAAAAAAAAAAAAALzX9AAAAAAA13%2FfZWkSiGNwgvxDqaRYoxeFSJg%3DOQb2TDBLsKI6HvK6TIrswKbgudqg7hSQ9HFqlKaMjy8VCVqvYx`
};

module.exports = new Twitter(config);
