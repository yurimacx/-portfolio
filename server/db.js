const { Pool } = require('pg');
const cfg = require('./config');
module.exports = new Pool({
  connectionString: cfg.databaseUrl,
  ssl: cfg.dbSsl ? { rejectUnauthorized: true } : false,
  max: 10,
  statement_timeout: 5000,
});
