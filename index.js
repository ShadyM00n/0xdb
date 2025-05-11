const { CreateDatabaseConfig, validateConfig, DatabaseConnection } = require("./lib");

const { Schema, model } = require("mongoose");



/**
 * @typedef DatabaseConfigType
 * @property {String} url - Connection URL to DB
 * @property {Schema} schema - Usable Schema in DB
 * @property {String} table - Table name in DB
 */


class Database {
    #_config;
    _db;

    /** Configuration for database connection
     * @param {DatabaseConfigType} config - Database Config
     */
    constructor (config) {
        this.#_config=config;
        if (!validateConfig(config, CreateDatabaseConfig)) return process.exit(1);
        if (!DatabaseConnection(config.url)) return process.exit(1);
        this._db=model(config.table, config.schema);
    }


    /**
     * @returns {Array} - Array of keys in the schema.
     */
    keys () {
        return Object.keys(this._db.schema.paths).filter(key => key !== '__v' && key !== '_id');
    }

    /**
     * Set the value of a key in your DB schema.
     * @param {String} key 
     * @param {Any} value 
     */
    async set (key, value) {
        let doc = await this._db.findOne();
        if (!doc) doc = new this._db({});
        doc[key] = value;
        await doc.save();
    }

    /** Turn your active schema into a JSON object.
     * @returns {Objecy} - Objectified schema contents.
     */
    async itemize () {
        const doc = await this._db.findOne();
        return doc ? doc.toObject() : {};
    }
    
    /**
     * Get the value of a defined key.
     * @param {String} key - DB Entry key.
     * @returns {Any} - Database return.
     */
    async get (key) {
        const doc = await this._db.findOne();
        return doc ? doc[key] : undefined;
    }

    /**
     * Delete the value of a key, and its key from the active schema.
     * @param {String} key - DB Entry key.
     * @returns {Boolean} - Success or Fail
     */
    async delete (key) {
        const doc = await this._db.findOne();
        if (!doc || !(key in doc)) return false;
        delete doc[key];
        await doc.save();
        return true;
    }

    /**
     * Update any JSON object with just the values of your update
     * @param {String} key 
     * @param {Any} value 
     */
    update (key, value) {
        return this.set(key, value);
    }
}

module.exports = { Database, Schema };