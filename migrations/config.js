module.exports = {
  db: process.env.DB_NAME || 'nimbusweb',
  driver: 'rethinkdbdash',
  pool: true,
  servers: [{ host: process.env.DB_HOST || '127.0.0.1', port: +process.env.DB_PORT || 28015 }],
  ssl: false,
};
