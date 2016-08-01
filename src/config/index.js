const config = {};

config.mongoStore = {
  url: process.env.MONGO_STORE_URI || 'mongodb://localhost:27017/cyza',
  secret: process.env.MONGO_STORE_SECRET || 'LJPSWW6JJWmTGfR2BmfuD77BUKhhnmy5',
};

config.auth = {
  secret: process.env.AUTH_SECRET || 'aRjXbyzSfzva3NMBx23GZX8KwGS2NbZy',
};

config.server = {
  port: process.env.PORT || 3000,
};

export default config;
