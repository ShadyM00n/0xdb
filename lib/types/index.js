const { Schema } = require("mongoose");

const CreateDatabaseConfig = {
    type: 'object',
    properties: {
        url: { type: 'string' },
        schema: { type: Schema },
        table: { type: 'string' }
    },
    required: [ 'url', 'schema', 'table' ]
};

module.exports = { CreateDatabaseConfig };