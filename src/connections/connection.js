const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '123',
        database: 'agenda_financeira'
    }
})

module.exports = knex;