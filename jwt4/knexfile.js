// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'token',
      user:     'postgres',
      password: '1234'
    },
    pool: {
      min: 5,
      max: 10
    }
  }
};
