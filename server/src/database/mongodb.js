const {MongoClient} = require("mongodb");
require('dotenv').config();

class Mongo {

    async connection() {
        const conn = new MongoClient(process.env.MONGO_URL);

        try {
            await conn.connect();

            this.db = conn.db(process.env.MONGO_DB);

            return this.db;
        } catch (err) {
            console.error(err);
        }
    }

    async getCollection(collection) {
        return this.db.collection(collection);
    }
}

module.exports = new Mongo();

