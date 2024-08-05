const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 4000,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "toeic_answer",
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 4000,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || "toeic_answer_pro",
  },
};

const config = {
  dev,
  pro,
};

const env = process.env.CURRENT_ENV || "dev";

module.exports = config[env];
