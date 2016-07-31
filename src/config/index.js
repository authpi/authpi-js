const config = {};

config.mongoStore = {
  url: process.env.MONGO_STORE_URI,
  secret: process.env.MONGO_STORE_SECRET,
};

config.auth = {
  secret: process.env.AUTH_SECRET,
};

export default config;
