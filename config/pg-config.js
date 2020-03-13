const initOptions = {
  /* initialization options */
};
const pgp = require('pg-promise')(initOptions);

pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);

module.exports = db;
